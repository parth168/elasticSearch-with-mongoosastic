const dao = require('./dao');
const { User } = require('./schema');
const response = require('./responseHandler');
const { http_codes,message } = require('./constant');

function addUser(req){
    return dao.findOne({ email : req.body.email })
                .then((user)=>{
                    if(user){
                        return response.errorResponse(http_codes.forbidden,message.already_exsist_user);
                    }
                    else{
                        newUser =  new User({
                            name : req.body.name,
                            email : req.body.email,
                            city : req.body.city
                        });

                        return dao.saveNewUser(newUser)
                                    .then((user)=>{
                                        return response.success(message.addedData,user);
                                    })
                                    .catch((e)=>{
                                        console.log({ e });
                                        return response.errorResponse(http_codes.internalServerError,message.internalServerError);
                                    });
                    }
                })
                .catch((e)=>{
                    console.log({ e });
                    return response.errorResponse(http_codes.internalServerError,message.internalServerError);
                });
}

function updateUser(req){
    return dao.findOne({ _id: req.body.id })
                .then((user)=>{
                    if(!user){
                        return response.errorResponse(http_codes.bad_request,message.data_Not_Exist);
                    }
                    else{
                        let update = {};
                        if(req.body.name){
                            update.name = req.body.name;
                        }
                        if(req.body.email){
                            update.email = req.body.email;
                        }
                        if(req.body.city){
                            update.city  = req.body.city;
                        }

                        dao.findOneAndUpdate({ _id: req.body.id },update)
                            .then((user)=>{
                                return response.success(message.data_Updated,user);
                            })
                            .catch((e)=>{
                                console.log({ e });
                                return response.errorResponse(http_codes.internalServerError,message.internalServerError);
                            });
                    }
                })
                .catch((e)=>{
                    console.log({ e });
                    return response.errorResponse(http_codes.internalServerError,message.internalServerError);
                });
}

function getById(req){
    return dao.findOne({ _id: req.params.id })
                .then((user)=>{
                    return response.success(message.user_Data,user);
                })
                .catch((e)=>{
                    console.log({ e });
                    return response.errorResponse(http_codes.internalServerError,message.internalServerError);
                })
}

function getUsers(req){
    let search = req.query.search || '';
    let currentPage = req.query.page || 1;
    let pageSize = req.query.perPageData || 10;
    let sort = "";
    if(req.query.sort){
        if(req.query.sort == 'name'){
            if(req.query.order == 1){
                sort = 'name:asc';
            }
            else{
                sort = 'name:desc'
            }
        }
        if(req.query.sort == 'email'){
            if(req.query.order == 1){
                sort = 'email:asc';
            }
            else{
                sort = 'email:desc'
            }
        }
        if(req.query.sort == 'city'){
            if(req.query.order == 1){
                sort = 'city:asc';
            }
            else{
                sort = 'city:desc'
            }
        }
    }

    let skip = (pageSize * currentPage) - pageSize;
    return dao.find(search,pageSize,skip,sort)
                .then((data)=>{
                    if(data){
                        return response.success(message.userDetails,data);
                    }
                    else{
                        return response.errorResponse(http_codes.bad_request,message.data_Not_Exist);
                    }
                })
                .catch((e)=>{
                    console.log({ e });
                    return response.errorResponse(http_codes.internalServerError,message.internalServerError);
                });
}

function updateUSer(req){

    return dao.findOneAndUpdate({ _id : req.params.id },req.body)
                .then((data)=>{
                    return response.success(message.data_Updated,data);
                })
                .catch((e)=>{
                    console.log({ e });
                    return response.errorResponse(http_codes.internalServerError,message.internalServerError);
                });
}

function deleteUSer(req){
    return dao.findByIdAndRemove(req.params.id)
                .then((data)=>{
                    if(data){
                        return response.success(message.data_Deleted,data);
                    }
                    else{
                        return response.errorResponse(http_codes.bad_request,message.data_Not_Exist);
                    }
                })
                .catch((e)=>{
                    console.log({ e });
                    return response.errorResponse(http_codes.internalServerError,message.internalServerError);
                });

}

module.exports = { addUser,updateUser,getUsers,updateUSer,deleteUSer,getById };