/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/record' , 'N/search' , 'N/ui/serverWidget'],

function( record, search , serverWidget) {
   
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @Since 2015.2
     */
	
	
    function onRequest(context) {
    	   if (context.request.method === 'GET') {
    		   //var customer = loadRecord("customer", "30");	
    		   //var vals  =  ["CLI000002", "CLI000003", "CLI000004", "CLI000005", "CLI000007", "CLI000008", "CLI000009", "CLI000010", "CLI000011", "CLI000012", "CLI000013", "CLI074497"]
    		   
    		   var searchRes  = null;
    		   var finalres = "";
    		   
    		   /*for(var i = 0 ; i < vals.length;  i++){
       		    searchRes =  searchIdByField("customer", "entityid", vals[i]);
       		    //var id = searchRes[0].values.internal
       		   var rec = loadRecord("customer", searchRes[0]);
      		    res.setValue({
      		    	fieldId: 'custentity_pl_clasificaciondelcliente',
      		    	value: "18",
      		    	ignoreFieldChange: true
      		    	
      		    });
       		    
       		    
       		    //finalres += JSON.stringify(searchRes) + " RECORDI";
       		 finalres += JSON.stringify(rec) + "  //";
    		   }*/
    		  // var rec = loadRecord("customer", "30");
    		   
    		   /*rec.setValue({
     		    	fieldId: 'custentity_pl_clasificaciondelcliente',
     		    	value: "18",
     		    	ignoreFieldChange: true
     		    	
     		    });
     		    rec.save();
     		    */
     		    
     		    
     		    
     		    
     		      var form = serverWidget.createForm({
     	                title: 'CRUD Form'
     	            });

     	            form.addField({
     	                id: 'id_field',
     	                type: serverWidget.FieldType.TEXTAREA,
     	                label: 'ID'
     	            });
     	            
     	           form.addField({
    	                id: 'ids_field',
    	                type: serverWidget.FieldType.TEXTAREA,
    	                label: 'IDS'
    	            });
     	           
     	           form.addField({
     	                id: 'recordtype_field',
     	                type: serverWidget.FieldType.TEXT,
     	                label: 'Record type'
     	            });
     	            form.addField({
     	                id: 'values_field',
     	                type: serverWidget.FieldType.TEXTAREA,
     	                label: 'Values (Separated by comma)'
     	            });
     	            
     	           form.addField({
    	                id: 'fieldname_field',
    	                type: serverWidget.FieldType.TEXT,
    	                label: 'Field name'
    	            });

     	         
     	            var subtextfield = form.addField({
     	                id: 'result_field',
     	                type: serverWidget.FieldType.TEXTAREA,
     	                label: 'Result'
     	            });
     	            
     	           var inline = form.addField({
    	                id: 'inline_field',
    	                type: serverWidget.FieldType.INLINEHTML,
    	                label: 'inline Field'
    	            });
     	           
     	            form.clientScriptModulePath = './SuiteletCRUDRecordClientt.js';
     	            form.addButton({
     	                id: 'query1',
     	                label: 'Get Record By ID',
     	                functionName: 'ctrlGetRecordById'
     	            });
     	            form.addButton({
     	                id: 'query2',
     	                label: 'Get Record Id By Field Value',
     	                functionName: 'ctrlGetRecordsIdsByFieldValue'
     	            });
     	            
     	           form.addButton({
    	                id: 'query3',
    	                label: 'Update Field Value ',
    	                functionName: 'ctrlUpdateRecordFieldValue'
    	            });
     	           
     	          form.addButton({
  	                id: 'query4',
  	                label: 'query4 ',
  	                functionName: 'query4'
  	            });
     	          
    		   context.response.writePage(form);
    	   }
    	
    }

    return {
        onRequest: onRequest
    };
    
});
