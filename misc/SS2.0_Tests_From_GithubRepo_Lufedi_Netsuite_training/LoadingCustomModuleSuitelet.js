/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

require.config({
    paths: {
        'custom': '/SuiteScripts/SuiteScript 2.0 Tutorial/LibScript'
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

    		context.response.write(customLib.greeting() + " 2 ");
    	}
    }
    return {
        onRequest: onRequest
    };
    
});
