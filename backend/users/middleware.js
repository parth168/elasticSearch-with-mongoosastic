const { http_codes,message } = require('./constant');
const validate =  require('./validate');
const response = require('./responseHandler');
const mongoose = require('mongoose');

function ValidateReqBody(req,res,next){
    if(req.body.name && req.body.email && req.body.city){
        let error = '';
        error  += validate.validateEmail(req.body.email);
        if(error){
            error = response.errorResponse(http_codes.bad_request,error);
            res.status(http_codes.bad_request).send(error);
        }
        else{
            next();
        }
    }
    else{
        error = response.errorResponse(http_codes.bad_request,message.invalid_request_body);
        res.status(http_codes.bad_request).send(error);
    }
}


function validateObjectId(req,res,next){
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        next();
    }
    else{
        let error = response.errorResponse(http_codes.bad_request,message.invalid_Id);
        res.status(http_codes.bad_request).send(error);
    }
}

module.exports  =  { ValidateReqBody,validateObjectId };