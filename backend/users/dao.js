require('dotenv').config();
const { User } = require('./schema');
const mongoose =require('mongoose');

function connectToMongodb(){
    return mongoose.connect(process.env.mongodb,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      });
}

function disconnectToMongodb(connection){
    connection.connection.close();
}

function saveNewUser(user){
    return connectToMongodb()
            .then((connection)=>{
                return user.save()
                            .then((user)=>{
                                disconnectToMongodb(connection);
                                return user;
                            })
                            .catch((error)=>{
                                disconnectToMongodb(connection);
                                return error;
                            });
            })
            .catch((error)=>{
                return new Error(error);
            });
}

function findOne(query){
    return connectToMongodb()
            .then((connection)=>{
                return User.findOne(query)
                            .then((user)=>{
                                disconnectToMongodb(connection);
                                return user;
                            })
                            .catch((error)=>{
                                disconnectToMongodb(connection);
                                return error;
                            });
            })
            .catch((error)=>{
                return error;
            });
}

function findOneAndUpdate(query,update){
    return connectToMongodb()
            .then((connection)=>{
                return User.findOneAndUpdate(query,update,{ new: true })
                            .then((user)=>{
                                disconnectToMongodb(connection);
                                return user;
                            })
                            .catch((error)=>{
                                disconnectToMongodb(connection);
                                return error;
                            });
            })
            .catch((error)=>{
                return error;
            });
}

function find(search_key,size,from,sort){
    return connectToMongodb()
            .then((connection)=>{
                return new Promise((resolve,reject)=>{
                    User.search({
                       query_string: {
                         query: "*"+search_key+"*"
                       }
                     }, {
                       from: from,
                       size: size,
                       sort : sort,
                       hydrate: true 
                     },(err,result)=>{
                         if(err){
                           disconnectToMongodb(connection);
                           reject(err);
                         }
                         else{
                             let data = {
                                 totalCount : result.hits.total.value,
                                 user : result.hits.hits
                             } 
                             disconnectToMongodb(connection);
                             resolve(data);
                         }
                     });
                });
            })
            .catch((error)=>{
                return error;
            });

}

function findByIdAndRemove(_id){
    return connectToMongodb()
            .then((connection)=>{
                return User.findByIdAndRemove(_id)
                            .then((data)=>{
                                disconnectToMongodb(connection);
                                return data;
                            })
                            .catch(((error)=>{
                                disconnectToMongodb(connection);
                                return error;
                            }))
            })
            .catch((error)=>{
                return error;
            });
}

module.exports = { saveNewUser,findOne,findOneAndUpdate,find,findByIdAndRemove };