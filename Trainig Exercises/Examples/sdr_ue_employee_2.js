
/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

// JSDOC
// https://system.na2.netsuite.com/app/help/helpcenter.nl?fid=chapter_4387175355.html

// NModuleScope
//The @NModuleScope JSDoc tag now has the following possible values:
//
//    SameAccount: Access to the module is limited to other modules from the same bundle, and modules native to the same source account or sandbox environment.
//    TargetAccount: Access to the module is limited to other modules from the same bundle, and modules native to the same source account, target account, or sandbox environment.
//    Public: Any script in the account can load and use the module.

define ([
        'N/record',
        'N/email',
        'N/task'
], function(RecMod,EmailMod,task){
            return {
                        afterSubmit: function(context) {
                            log.audit('afterSubmit','begin');
                            var customer = context.newRecord;

                            var schedTask = task.create({
                                taskType: task.TaskType.SCHEDULED_SCRIPT
                            });

                            var customerID = customer.id;

                            log.audit('afterSubmit','customerID: ' + customerID);

                            schedTask.scriptId = 'customscript94';
                            schedTask.deploymentId = 'customdeploy1';
                            schedTask.params = {
                                custscript_sdr_customer: customerID
                            };

                            schedTask.submit();

                            log.audit('afterSubmit','end');
                        }
                 }
        });