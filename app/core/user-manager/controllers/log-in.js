var express = require('express');
var errorHandler=require('../../../../utils/common/error-response-handler');
var router = express.Router();

var businessLayer=require('../models/user-business');

//user/token
router.post('/', function (req, res) {

  businessLayer.logIn(req,onSuccessLogIn,onFailLogIn);

  function onSuccessLogIn(token){
    console.log("User creation success");
    res.status(200).json({
        "message":"user login success",
        "barerToken":token
    }).send();
  }
  function onFailLogIn(err){
    errorHandler.responseError(res,err);
  }
});

module.exports = router;