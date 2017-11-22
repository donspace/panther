var configObject=require("../../../config/config.json");
var errorObject=require("../../../config/errors.json");

module.exports={
    getConfigJson:function(){
        return configObject;
    },
    getErrorObject:function(){
        return errorObject;
    }
};