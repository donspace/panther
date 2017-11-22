

module.exports=function(userBusiness,userAuthentication,utils){
    var express = require('express');
    var passport = require('passport');

    var errorHandler=utils.errorHandler;
    var router = express.Router();
    
    //POST : /user
    router.post('/user', function (req, res) {
      
      function onSuccessSignUp(obj){
        console.log("User creation success");
        res.status(200).json({"message":"user creation success"}).send();
      }
      function onFailSignUp(err){
        errorHandler.responseError(res,err);
      }

      userBusiness.signUp(req.body).then(onSuccessSignUp).catch(onFailSignUp);
     
    });

    //POST:/users/login
    router.post('/users/login', passport.authenticate('local',{session: false}),function(req, res) {
          var uid = req.user.id;
          res.status(200).json({"uid":uid}).send();
    });

    return router;

}
