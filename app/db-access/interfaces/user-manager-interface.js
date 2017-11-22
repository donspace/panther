module.exports=function(userSchema){

    function createNewUser(userObject){
        return userSchema.createUser(userObject.name,userObject.username,userObject.password,userObject.bearerToken,userObject.role,userObject.userPermission,userObject.location);
    }

    function login(username){
        return userSchema.login(username)
    }
    
    //interfaces
    return{
        iCreateNewUser:function(userObject){
            return createNewUser(userObject);
        },
        iLogin:function(username){
            return login(username);
        }
    }

}

