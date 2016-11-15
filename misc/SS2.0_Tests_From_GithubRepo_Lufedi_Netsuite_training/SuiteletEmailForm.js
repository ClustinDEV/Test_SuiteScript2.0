/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

function test( ){
	var a = "adfsdf";
}
test();
define(['N/ui/serverWidget',
        'N/email',
        'N/runtime',
        'N/redirect',
        'N/search',
        'N/log'],
        //luis.diaz@payulatam.com	
    function(ui, email, runtime, redirect, search, log) {
        function onRequest(context) {
            if (context.request.method === 'GET') {
                var form = ui.createForm({
                    title: 'Demo Suitelet Form'
                });
                var subject = form.addField({
                    id: 'subject',
                    type: ui.FieldType.TEXT,
                    label: 'Subject'
                });
                subject.layoutType = ui.FieldLayoutType.NORMAL;
                subject.breakType = ui.FieldBreakType.STARTCOL;
                subject.isMandatory = true;
                var recipient = form.addField({
                    id: 'recipient',
                    type: ui.FieldType.EMAIL,
                    label: 'Recipient email'
                });
                recipient.isMandatory = true;
                var message = form.addField({
                    id: 'message',
                    type: ui.FieldType.TEXTAREA,
                    label: 'Message'
                });
                message.displaySize = {
                    width: 60,
                    height: 10
                };
                
                form.addSubmitButton({
                    label: 'Send Email'
                });
                
                
                var list = ui.createList({
                	title:'list_test'
                });
                list.addColumn({
                	id:'cn',
                	type:  ui.FieldType.TEXT,
                	label: 'nombre',
                	align: ui.LayoutJustification.LEFT
                });
                list.addColumn({
                	id:'ce',
                	type:  ui.FieldType.TEXT,
                	label: 'estado',
                	align: ui.LayoutJustification.LEFT
                });
				list.addColumn({
					id:'cd',
                	type:  ui.FieldType.TEXT,
                	label: 'fecha',
                	align: ui.LayoutJustification.LEFT
				});
				
				
				list.addRow({
					row:{ cn: 'pipe', ce: 'activo', cd: 'date' }
				});
				
				
				
				
				
				
                context.response.writePage(form);
                //context.response.writePage(list);
                
              
            } else {
                var request = context.request;
                email.send({
                    author: runtime.getCurrentUser().id,
                    recipients: request.parameters.recipient,
                    subject: request.parameters.subject,
                    body: request.parameters.message
                });
                console.log("prueba de cliente servidor desde el Suitelet");
                
               
             
                
                redirect.toSuitelet({ scriptId: 'customscriptsuiteletemailform_luis' , deploymentId: 'customdeploysuiteletemailform_luis' });
            }
        }
        return {
            onRequest: onRequest
        };
    });