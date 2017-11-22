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
How to write a **panther module**
--------------------------
