/**
 * @NApiVersion 2.0
 * @NScriptType ScheduledScript
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
    'N/search',
    '/SuiteScripts - Globals/lib/sdr_lib',
    'N/runtime'
], function(search,sdr_lib,runtime){

    function execute(context){

        log.audit('execute','Begin');

        log.audit('execute','Going to search');

        var scriptRef = runtime.getCurrentScript();
        var customerId = scriptRef.getParameter({
            name: 'custscript_sdr_customer'
        });

        log.audit('execute','customerId:' + customerId);

        var ordersSearch = search.create({
            type: search.Type.TRANSACTION,
            filters: [
                ['type',search.Operator.ANYOF, 'SalesOrd'], 'and',
                ['mainline', search.Operator.IS, true], 'and',
                    ['entity', search.Operator.IS, customerId]
            ],

            columns: ['entity','trandate','tranid']
        });

        log.audit('execute','Got ordersSearch: ' + ordersSearch.length);

        log.audit('execute','Going to sendReport');

        sdr_lib.sendReport(ordersSearch);

        log.audit('execute','Report sent, end');
    }

    return {
        execute: execute
    }


});