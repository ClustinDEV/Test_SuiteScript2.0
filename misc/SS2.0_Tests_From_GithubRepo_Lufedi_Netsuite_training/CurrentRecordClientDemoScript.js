/**
 * @NApiVersion 2.0
 */
define(['N/currentRecord' , 'N/search'], function(currentRecord, search) {
    return({
        test_set_getValue: function() {
        	
        	
        	var res = [];
            var ss = search.create({
                type: "customer",
                title: 'get client id by field value',
                //id: 'customsearch_get_clientid_by_field_value_2',
                columns: [{
                    name: 'internalId'
                }, {
                    name: 'altname'
                }, {
                    name: 'entityid'
                }],
                filters: [{
                    name: "entityid",
                    operator: 'is',
                    values: "30"
                }]
            });
            //ss.save();
            //var sc =  search.load({id:  'customsearch_get_clientid_by_field_value'});
            ss.run().each(function(result) {
                /*var entity = result.getValue({
                    name: 'entity'
                });
                var subsidiary = result.getValue({
                    name: 'subsidiary'
                });
                return true;*/
            	log.debug({
            		title:"log",
            		details:result});
            	
            	res.push(result.getValue({name: "internalid"}));
            	return true;
            });
            

        	var record = currentRecord.get();
            record.setValue({
                fieldId: 'custpage_textfield',
                value: 'Body value',
                ignoreFieldChange: true,
                fireSlavingSync: true
            });
            var actValue = record.getValue({
                fieldId: 'custpage_textfield'
            });
            record.setValue({
                fieldId: 'custpage_resultfield',
                value: actValue,
                ignoreFieldChange: true,
                fireSlavingSync: true
            });
            
            
            var record = currentRecord.get();
            record.setValue({
                fieldId: 'custpage_textfield',
                value: 'Body value',
                ignoreFieldChange: true,
                fireSlavingSync: true
            });
            var actValue = record.getValue({
                fieldId: 'custpage_textfield'
            });
            record.setValue({
                fieldId: 'custpage_resultfield',
                value: actValue,
                ignoreFieldChange: true,
                fireSlavingSync: true
            });
        },

        test_set_getCurrentSublistValue: function() {
            var record = currentRecord.get();
            record.setCurrentSublistValue({
                sublistId: 'sitecategory',
                fieldId: 'custpage_subtextfield',
                value: 'Sublist Value',
                ignoreFieldChange: true,
                fireSlavingSync: true
            });
            var actValue = record.getCurrentSublistValue({
                sublistId: 'sitecategory',
                fieldId: 'custpage_subtextfield'
            });
            record.setValue({
                fieldId: 'custpage_sublist_resultfield',
                value: actValue,
                ignoreFieldChange: true,
                fireSlavingSync: true
            });
        }
        
     
    });
});