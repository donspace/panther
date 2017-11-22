
// _____________ kontainer_____________
var container = require('kontainer-di');
var express = require('express');
var router = express.Router();
var lazy= require('lazy.js');

// injectDependancies(testContainer);


function nameSpaceGenerator(dependancies){
    var depencyString=dependancies.join();
    var functionString = "(function nameSpaceFunction("+depencyString+"){ return { "+depencyString+" }})"
    var implementation =eval(functionString);
    return implementation;
}   

var injectDependancies=function(con){
    con.forEach(function(module) {
        var implFunction=null;
        if(module.namespace){
            implFunction=nameSpaceGenerator(module.dependancies);
        }else{
            implFunction=require.main.require(module.absolutePath);
        }

        if(module.dependancies){
            container.registerModule(module.name,module.dependancies,implFunction);
        }else{
            container.registerModule(module.name,[],implFunction);
        }
        
    }, this);

    return container;

}

var routeRegister=function (con){
    filteredCon =lazy(con).filter(function(state){
        return state.route;
    }).toArray();

    var tempModule;
    filteredCon.forEach(function(dep){
        tempModule =container.getModule(dep.name);
        router.use(dep.route,tempModule);        
    },this)
    
    return router;
}

module.exports={routeRegister,injectDependancies};