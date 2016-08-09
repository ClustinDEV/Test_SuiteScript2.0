/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define([
    'N/search'
], function(search) {


    return {
        getInputData: function() {
            var invSearch = search.create({
                type: search.Type.TRANSACTION,
                filters: [
                    ['type', search.Operator.ANYOF, 'CustInvc'], 'and',
                    ['mainline',search.Operator.IS, true]
                ],
                columns: ['entity', 'total']
            });

            return invSearch;
        },
        map: function(context){
            var searchResult = JSON.parse(context.value);

            context.write({
                key: searchResult.values.entity.text,
                value: searchResult.values.total
            });
        },
        reduce: function(context){
            var total = 0;

            for (var i in context.values)
            {
                total += parseFloat(context.values[i])
            }

            log.debug(context.key, total)
        },
        summarize: function(summary)
        {
            //log.audit('summarize','number of queues: ' + summary.concurrency);
            log.error('summarize','Imput error: ' + summary.inputSummary.error);
        }
    }
});