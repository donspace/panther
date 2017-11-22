var errorConfig=require("./config-reader");

module.exports={
    responseError: function(responseObject,errorObject){

        var error=errorConfig.getErrorObject()[errorObject.code.toString()];
        var responseErrorObject={
            "error":{
                "errorMessage":error.message,
                "errorCode":error.code.toString()
            }
        };

        if(!error){
            responseObject.status(500).json({
                "errorMessage":"something went wrong",
                "errorCode":"01"
            }).send();
            return 0;
        }

        if(error.status==401){
            responseObject.status( 401 ).json(responseErrorObject).send();
        }

        responseObject.status( (error.status)? error.status : 500 ).json(responseErrorObject).send();
    }
};