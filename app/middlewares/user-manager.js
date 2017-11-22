var jwt    = require('jsonwebtoken');
var configObj=require('../utils/common/config-reader');
var errorHandler=require('../utils//common/error-response-handler');

var userManagementConfig=configObj.getConfigJson().userManagementConfig;

//initializing constants from config
var SUPER_SECRET=userManagementConfig.superSecret;
var EXIPIRATION_TIME=userManagementConfig.signExpirationTimeMinutes;
var API_STATUS_LIST=userManagementConfig.isTokenValidationRequired;

// sign user and generate token using secret
function signUserFromJWT(user){

    var signOptions={
        expiresIn: EXIPIRATION_TIME
    }

    var token = jwt.sign(user, SUPER_SECRET,signOptions);

    return token;
}

//verify the barer token
function verifyToken(token,verifyTokenCallback){

    jwt.verify(token,SUPER_SECRET,verifyTokenCallback);

}

module.exports={
    generateToken:function(user){
        return signUserFromJWT(user);
    },
    verifyRequest:function(request,response,next){

        var apiStatus=API_STATUS_LIST[request.originalUrl];
        
        if(apiStatus == undefined){
            var errorObject={"code":"JWT002"};
            errorHandler.responseError(response,errorObject);
            return 0;
        }else if(apiStatus==false){
            //if validation is not required
            return next();
        }

        var token = request.body.token || request.query.token || request.headers['x-access-token'];
        var decoded= verifyToken(token,verifyTokenCallback);

        function verifyTokenCallback(err, decoded) { 
            if(err){
                //Authentication failed -High security risk
                var errorObject={"code":"JWT001"};
                errorHandler.responseError(response,errorObject);
                return 0;

            }else{
                request.decoded=decoded;
                next();
            }
        }
    }
}