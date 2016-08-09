
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


require.config({
    shim: {
        'underscore': {
            exports: '_'
        }
    },
    paths: {
        underscore: '/SuiteScripts/underscore'
    }
});

define([
        'N/email',
        'N/file',
        '/SuiteScripts/Test'
], function(EmailMod,FileMod,TestMod){
            return {
                        afterSubmit: function(context) {
                            if(context.UserEventType.EDIT)
                            {
                                log.audit('afterSubmit','begin' + TestMod.getPref());



                                require(['underscore'], function (underscore){

                                });


                                log.audit('afterSubmit','end');
                            }

                        }
                 }
        });