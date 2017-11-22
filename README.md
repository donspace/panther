<p align="center">
  <img src="https://raw.githubusercontent.com/donspace/panther/master/logo.jpg" />
</p>


 <center> <h3> Powerful - Maintainable - Layered </h3> </center>

Documentation
=============
Panther-JS is a NodeJS framework with Integrated advanced dependency injection mechanism in to it , in order to write more manageable code and make unit testing easy.

Why dependency injection is necessary? 
-------------------------------------------
> - Writing **Require** statements all over the code can end up in unmanageable code when it comes to large scale projects. 

> - Its hard to get an idea about the code since all the dependency injections are scattered through out each and every file. Hence readability of the code decreases. 

> - To do unit testing properly , you have to isolate parts of the code removing dependencies.  This can be also hectic if its not properly maintained

>- If you want to have multiple layers of the code,  you will have a hard time since, require can access anywhere without any problem.

>- Most of the paths in require statements can be really ugly such as (.../..../ ../config.js ) when u have to navigate through parent directories.  

>- If in any case the programmer needed to change the folder structure of the code, again will have to touch and change each and every file to maintain the dependencies.


Getting Started
----------------

First you have to download the framework , build all the NPM modules and come up with a running project. Initially framework is devided in to 3 major layers. (you can add any amount of layers or remove existing ones)
1. Core layer
2. Common layer
3. DB access layer

Each of above layers have its own dependancy config **Json** file in **config/dependancies**

In **app.js** each of above mentioned dependancy configs are required and injected as this. If you add ur own config file, you have to add it here in the same way. If you are removing a config file, you have to unplug it from here too.

```javascript
var dependancyManager=require('./app/middlewares/dependancy-manager');

var commonDependancies=require('./config/dependancies/common-dependancies');
var dbAccessDependancies=require('./config/dependancies/db-access-dependancies')
var coreDependancies=require('./config/dependancies/core-dependancies');

dependancyManager.injectDependancies(commonDependancies);
dependancyManager.injectDependancies(dbAccessDependancies);
dependancyManager.injectDependancies(coreDependancies);
```

How to define a dependancy
--------------------------
Each dependacy config object can have up to 5 fields.

1. **name** :This specifies the name of the dependancy. The string you use here will be taken as the reference to the dependancy.
2. **absolutePath**:This is the absolute path of the dependacy file, considering app.js is the root.
```javascript
    {
        "name":"userAuthentication",
        "absolutePath":"./app/core/user-manager/models/user-authentication",
    },

```

3. **dependancies** : This is an array of dependancy names which should be injected to that module. That dependancy has to be injected prior to the module which it will be injected to.

```javascript
    {
        "name":"userSchema",
        "absolutePath":"./app/db-access/schemas/user-schema",
    },
    {
        "name":"userManagerInterface",
        "absolutePath":"./app/db-access/interfaces/user-manager-interface",
        "dependancies":["userSchema"]
    },
```
How to write a ```Panther Module ```
-------------------------------------------
When writing panther module, you should take care of below points,
>- **Module.exports** should be a function which has a **similar number of parameters** as mentioned in the dependancy config. Otherwise you will recieve an error message saying, the argument number is not matching.

>- The dependencies will be injected in the **same order** as mentioned in the config file.

```javascript
module.exports=function(utils,userInfoService){
    
    // you can access injected modules
    var userInfoObj = userInfoService;
    var configReader=utils.configReader;
    
    // your code goes here
    var add=funtion(a,b){
        return a+b;
    }
    
    var x =10;

    return{
        //these return objects will be injected to other modules which are dependant on this one
        x ,
        add
    }
};
```
How to write an XpressJS Route as a ```Panther Module ```
---------------------------------------------------------
Route module should be same as the normal panther module and the **route object should be returned**

```javascript
module.exports=function(userBusiness,utils){
    var express = require('express');
    var passport = require('passport');

    var router = express.Router();
    
    //POST : /user
    router.post('/user', function (req, res) {
      //your code
    });

    //POST:/users/login
    router.post('/users/login', passport.authenticate('local',{session: false}),function(req, res) {
         //your code
    });

    return router;  

}
```

Extra field **route** should be added to the dependancy config object of the route as the base route. 
It will be automatically injected as an xpress route of the app.

```javascript
    {
        "name":"user",
        "absolutePath":"./app/core/user-manager/controllers/user",
        "route":"/core/user-manager/user",
        "dependancies":["userBusiness","utils"]
    }
```

```Panther Namespaces ```
---------------------------------------------------------
Panther provides Namespaces as a special feature. A panther namespace can hold multiple dependancies in a single module.
Using these namespaces the code can be layered. For an example, all the modules in db access layer can be layered as , "dbAccessNamespace". Then it can be injected to the business layer modules as a module bundle from db access layer.
```javascript
[
    {
        "name":"configReader",
        "absolutePath":"./app/utils/common/config-reader"
    },
    {
        "name":"errorResponseHandler" ,
        "absolutePath":"./app/utils/common/error-response-handler.js"
    },
    {
        "name":"utils",
        "namespace":true,
        "dependancies":["configReader","errorResponseHandler"]
    }
]
```
