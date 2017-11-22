module.exports=function(DBALayer){

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    var DBA_UserManager =DBALayer.userManagerInterface;

    function passportLocalStratergy(username, password, done){

        DBA_UserManager.iLogin(username)
        .then(function (userObject){
            //user exist scenario 
            if(userObject.password !== password){
                return done(null,false,{ message: 'Incorrect password.' });
            }
            return done(null,userObject);
        })
        .catch(function (err){
            //user doesnt exist
                return done(err);
            }
        );
    }
    
    passport.use(new LocalStrategy(passportLocalStratergy));
    
    
}