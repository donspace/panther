module.exports = function(dbAccess){

  var mongoose=dbAccess.mongoose;
  var Schema = mongoose.Schema;

  var userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bearerToken:{ type: String},
    role: String,
    userPermission:[String],
    location: String
  },{ timestamps: true});

  // we need to create a model using it
  var User = mongoose.model('users', userSchema);

  return{
      createUser: function(name,username,password,bearerToken,role,userPermission,location){

        var newUser=User({
            name:name,
            username:username,
            password:password,
            role:role,
            userPermission:userPermission,
            location :location
        });

        return Promise.resolve(newUser.save());
      },
      login: function(username){
         return Promise.resolve(User.findOne({'username':username}));
      }
  }

}