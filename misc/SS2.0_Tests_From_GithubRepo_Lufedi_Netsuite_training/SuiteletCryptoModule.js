/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget', 'N/crypto', 'N/encode', 'N/runtime'],
     function(ui, crypto, encode, runtime) {
         function onRequest(option) {
             if (option.request.method === 'GET') {
                 var form = ui.createForm({
                     title: 'My Credential Form'
                 });
                 form.addSecretKeyField({
                     id: 'mycredential',
                     label: 'Credential',
                     restrictToScriptIds: [runtime.getCurrentScript().id],
                     restrictToCurrentUser: false
                 }).maxLength = 200;
                 form.addSubmitButton();
                 option.response.writePage(form);
             } else {
                 var form = ui.createForm({
                     title: 'My Credential Form'
                 });
                 var inputString = "YWJjZGVmZwo=";
                 var myGuid = option.request.parameters.mycredential;
                 // Create the key
                 var sKey = crypto.createSecretKey({
                     guid: myGuid,
                     encoding: encode.Encoding.UTF_8
                 });
                 try {
                     var hmacSha512 = crypto.createHmac({
                         algorithm: 'SHA512',
                         key: sKey
                     });
                     hmacSha512.update({
                         input: inputString,
                         inputEncoding: encode.Encoding.BASE_64
                     });
                     var digestSha512 = hmacSha512.digest({
                         outputEncoding: encode.Encoding.HEX
                     });
                 } catch (e) {
                     log.error({
                         title: 'Failed to hash input',
                         details: e
                     });
                 }
                 form.addField({
                     id: 'result',
                     label: 'Your digested hash value',
                     type: 'textarea'
                 }).defaultValue = digestSha512;
                 option.response.writePage(form);
             }
         }
         return {
             onRequest: onRequest
         };
     });
