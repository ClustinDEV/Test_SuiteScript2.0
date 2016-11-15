define(['N/currentRecord' , 'N/search' , ' N/record'], function(currentRecord, search, record) {

	var curr = currentRecord.get();

	function searchIdByField(type, columns, filters){
			        function createAnotherSearch() {
			        	var res = [];
			            var ss = search.create({
			                type: type,
			                columns: columns,
			                filters: filters
			            });
			            ss.run().each(function(result) {
			            	res.push(result.getValue({name: "internalid"}));
			            	return true;
			            });
			            return res;
			        }
		return createAnotherSearch();
	}
	
	function loadRecord(type, id){
		return record.load({
			type: type,
			id: id
		});
	}

	function ctrlGetRecordById(){
		 var type = curr.getValue({ fieldId: 'recordtype_field'});
		 var id =  curr.getValue({fieldId: 'id_field'});
		 curr.setValue({
             fieldId: 'result_field',
             value: JSON.stringify( loadRecord(type, id)),
             ignoreFieldChange: true,
             fireSlavingSync: true
         });
	}
	
	function servUpdateRecordFieldValue(type, id, field,  val){
		console.log(type +  " " + id + " "  + val)
		 var rec =  loadRecord(type, id);
		 try{
			 rec.setValue({
		 
		    	fieldId: field,
		    	value: "18",
		    	ignoreFieldChange: true,
		    	fireSlavingSync: true
		    	
		   });
		
		rec.save();
		 }catch(e){
			 console.log("error en la actualizaci�n");
			 curr.setValue({
	             fieldId: 'result_field',
	             value:"Error actualizando el registro",
	             ignoreFieldChange: true,
	             fireSlavingSync: true
	         });
		 }
	}
	
	function ctrlUpdateRecordFieldValue(){
		 var type = curr.getValue({fieldId: 'recordtype_field'});
		 var id =  curr.getValue({fieldId: 'id_field'});
		 var val = curr.getValue({fieldId: 'values_field'});
		 var fieldname = curr.getValue({fieldId: 'fieldname_field'});
		 servUpdateRecordFieldValue(type, id, fieldname, val);
	}
	
	function ctrlUpdateRecordsFieldValue(){
		 var type = curr.getValue({fieldId: 'recordtype_field'});
		 var ids = JSON.parse(curr.getValue({fieldId: 'ids_field'}));
		 var val = curr.getValue({fieldId: 'values_field'})+ "";
		 var fieldname = curr.getValue({fieldId: 'fieldname_field'});
		 console.log(val  + " " + type );
		 for(var i = 0 ; i < ids.length; i++){
			servUpdateRecordFieldValue(type, ids[i], fieldname, val);
		 }
	}
	
	function ctrlGetRecordsIdsByFieldValue(){
		var type = curr.getValue({ fieldId: 'recordtype_field'});
		var val = curr.getValue({fieldId: 'values_field'});
		var fieldname = curr.getValue({fieldId: 'fieldname_field'});
		 var operator = 'is';
		 if(val == ""){
			 operator =  search.Operator.ISEMPTY;
		 }
		 console.log(type  + " " + val  + " " + fieldname);
		 
		 try{
			 var cols = [{
                 name: 'internalId'
             }];
			 var values =  [];
			 for(var i = 0; i <= 18 ; i++){
				 values.push(i+"");
			 }
			 var filters =  [{
                 name: fieldname,
                 operator: search.Operator.NONEOF,
                 values: values
                 
             }];     
			 var ids = searchIdByField(type, cols, filters);
			 curr.setValue({
				fieldId: 'result_field',
				value: JSON.stringify(ids),
				 ignoreFieldChange: true,
	             fireSlavingSync: true
			 });
			 
		 }catch(e){
			 curr.setValue({
	             fieldId: 'result_field',
	             value:"Error realizando la busqueda" + e.message,
	             ignoreFieldChange: true,
	             fireSlavingSync: true
	         });
		 }
	}
	
	
	
	function query4(){
		ctrlUpdateRecordsFieldValue();
	}
	
	
    return {
    	
    	ctrlGetRecordById : ctrlGetRecordById,
    	ctrlUpdateRecordFieldValue: ctrlUpdateRecordFieldValue,
    	ctrlGetRecordsIdsByFieldValue :  ctrlGetRecordsIdsByFieldValue,
    	query4: query4
    };
    
});
