

module.exports=function(utils){
    
    var mongoose = require('mongoose');
    var configReader=utils.configReader;
    
    var config=configReader.getConfigJson().mongoServerConfig;
    
    //connection string for db
    var connectionString=config.host +":"+ config.portNumber+"/"+config.dbName;
    mongoose.connect(connectionString);


    return{
        mongoose
    }
};



