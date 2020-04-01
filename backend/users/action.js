const service = require('./service');

function addUser(req){
    return service.addUser(req);
}

function updateUser(req){
    return service.updateUSer(req);
}

function getById(req){
    return service.getById(req);
}

function getUsers(req){
    return service.getUsers(req);
}

function deleteUSer(req){
    return service.deleteUSer(req);
}

module.exports  = { addUser,updateUser,getUsers,deleteUSer,getById };
