/**
* @NApiVersion 2.0
* @NScriptType suitelet
*/
define(["N/ui/serverWidget" ], function(serverWidget){
	
	
	
    return {
    	
    	
    	
        onRequest: function(params) {
        	
        	 
             
             
            var response = params.response;
            var form = serverWidget.createForm({
                title: 'Simple Form'
            });

            var textfield = form.addField({
                id: 'custpage_textfield',
                type: serverWidget.FieldType.TEXT,
                label: 'Text Field'
            });
            var resultfield = form.addField({
                id: 'custpage_resultfield',
                type: serverWidget.FieldType.TEXT,
                label: 'Result Field'
            });
            var sublistResultfield = form.addField({
                id: 'custpage_sublist_resultfield',
                type: serverWidget.FieldType.TEXT,
                label: 'Sublist Result Field'
            });

            var sublistObj = form.addSublist({
                id: 'sitecategory',
                type: serverWidget.SublistType.INLINEEDITOR,
                label: 'Custom Sublist'
            }); 
            var subtextfield = sublistObj.addField({
                id: 'custpage_subtextfield',
                type: serverWidget.FieldType.TEXT,
                label: 'Sublist Text Field'
            });

            form.clientScriptModulePath = './CurrentRecordClientDemoScript.js';
            form.addButton({
                id: 'custpage_custombutton',
                label: 'SET_GET_VALUE',
                functionName: 'test_set_getValue'
              
            });
            
//            function hello(){
//        		form.getField({
//        			id : 'custpage_resultfield'
//        		}).setValue({
//        			
//        		})
//        	}
            
            
            form.addButton({
                id: 'custpage_custombutton2',
                label: 'SET_GETCURRENTSUBLISTVALUE',
                functionName: 'test_set_getCurrentSublistValue'
            });

            response.writePage( form );
        }
    };
});