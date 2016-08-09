/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([
    'N/ui/message',
    'N/ui/dialog',
    'N/url',
    'N/https'
], function(message,dialog,url,https) {

    return {
            pageInit: function(context) {

                //debugger;

            log.debug('pageInit','begin');

            if (context.mode == 'edit')
            {
                var expRep = context.currentRecord;
                var tranId = expRep.getValue('tranid');

                dialog.create({
                    title: 'Server request',
                    message: 'Wanna perform server request',
                    buttons: [
                        {
                            label: 'OK', value: 1
                        },
                        {
                            label: 'NO', value: 0
                        }
                    ]
                }).then(
                    function (pressedValue)
                    {
                        //debugger;

                        switch (pressedValue)
                        {
                            case 1:
                                var SuiteletURL = url.resolveScript({
                                    scriptId: 'customscript_sdr_sl_log_user',
                                    deploymentId: 'customdeploy_sdr_sl_log_user'
                                });

                                https.post.promise({
                                    url: SuiteletURL,
                                    body : {
                                        tranId: tranId,
                                        createError: 'T'
                                    }
                                }).then(function (response){

                                    var response = JSON.parse(response.body);

                                    if (response.success)
                                    {
                                        message.create({
                                            type: message.Type.CONFIRMATION,
                                            title: 'Operation succesfully',
                                            message: response.message,
                                            duration: 5000
                                        }).show();

                                    }
                                    else
                                    {
                                        message.create({
                                            type: message.Type.ERROR,
                                            title: 'Operation succesfully',
                                            message: response.message,
                                            duration: 5000
                                        }).show();
                                    }

                                }).catch(function onRejected(reason) {
                                    log.debug({
                                        title: 'Invalid Request: ',
                                        details: reason
                                    });
                                });
                                break;
                        }
                    }
                );


            }

            log.debug('pageInit','end');
        }
    }
});
