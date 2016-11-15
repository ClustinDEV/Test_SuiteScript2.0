/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

//importacion de modulos personalizados
require.config({
    paths: {
        'custom': '/SuiteScripts/Suitescript 2.0 Tutotial/LibScript'
    }
});
    
define(['N/https' , 'N/search', 'custom'],

function(https, search, customLib) {
   
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @Since 2015.2
     */
    function onRequest(context) {
    	if(context.request.method === 'GET'){
    		
    		var conf = {
    		url: 'https://rest.sandbox.netsuite.com/app/site/hosting/restlet.nl?script=577&deploy=1',
            headers  : {'Authorization': 'NLAuth nlauth_account=3773733,nlauth_email=luis.diaz@payulatam.com,nlauth_signature=Pipediaz12,nlauth_role=3'}
    		};
            var response = https.get(conf);
            
            
//    		var searchLoaded =  search.load({id:'customsearch2190'});
//			var resultSet  = searchLoaded.run();
//    		context.response.write(JSON.stringify(resultSet));
    		
    		
    		context.response.write(customLib.greeting() + " " + response.body);
            
    		//context.response.write('hola mundo');
    	}
    	
    	
    	
    	
    	
    	
    }
    return {
        onRequest: onRequest
    };
    
});
