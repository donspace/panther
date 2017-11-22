
module.exports=function(DBALayer){

    var DBA_UserManager =DBALayer.userManagerInterface;
    
    return{
        signUp : function(bodyObject){

            var userObject=bodyObject.userMetadata;
            return DBA_UserManager.iCreateNewUser(userObject);
        },
        logIn:function(request,onSuccess,onFail){
            //dbAccessLayer access
            //dbAccessLayer.logIn(request,onSuccess,onFail);
            console.log("It works")
        }
    }
}

