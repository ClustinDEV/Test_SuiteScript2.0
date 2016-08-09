/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define([
    'N/record',
], function(record) {
    return {
        onRequest: function (context) {
            try
            {
                var request  = context.request;
                var expRepNo = request.parameters.tranId;
                var createError = request.parameters.createError;
                var employeeId = -5;

                if (createError == 'T')
                {
                    throw 'client requested error'
                }

                var employee = record.load({
                    type : record.Type.EMPLOYEE,
                    id   : employeeId
                });

                log.debug('User ' + employee.getValue('entityid') +
                    ' opened expense report number ' + expRepNo);

                var response = {};
                response.success = true;
                response.message = 'Log succesfully'


            }
            catch (err)
            {
                var response = {};
                response.success = false;
                response.message = err.toString()
            }


            context.response.write(JSON.stringify(response));
        }
    };
});