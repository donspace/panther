/**
 * Author: Don Rajitha Dissanayake
 * Required Modules
 */
var express=require("express");
var passport = require('passport');
var app=express();
var dependancyManager=require('./app/middlewares/dependancy-manager');

var commonDependancies=require('./config/dependancies/common-dependancies');
var dbAccessDependancies=require('./config/dependancies/db-access-dependancies')
var coreDependancies=require('./config/dependancies/core-dependancies');

dependancyManager.injectDependancies(commonDependancies);
dependancyManager.injectDependancies(dbAccessDependancies);
dependancyManager.injectDependancies(coreDependancies);



//configurations
const configReader=require("./app/utils/common/config-reader");

const helmet = require('helmet');
const bodyParser = require('body-parser');


// const user=require("./app/components/core-components/user-manager/controllers/user");
// const shop=require("./app/components/core-components/dashboard-manager/controllers/dashboard-manager");



/**
 * variable declarations from modules
 */
var configObject=configReader.getConfigJson();
var port=configObject.serverConfig.portNumber;


/**
 * Middlewares 
 */
app.use(helmet());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(passport.initialize());
app.use(passport.session());
app.use('/',dependancyManager.routeRegister(coreDependancies));


//app.use(userManager.verifyRequest);

/**
 * Routing Micro Services Bundles
 */
//app.use('/user',user);
//app.use('/shop',shop);

// var signIn=require('./app/components/core-components/user-manager/controllers/signin');
// app.use('/signin',signIn)

/**
 * Server Bootstrap
 */
app.listen(port,serverListenHandler);

function serverListenHandler(err){
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
}
