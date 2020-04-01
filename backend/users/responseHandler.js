const { http_codes } = require('./constant');

function errorResponse(http_code,message){
    return{
        code : http_code,
        message : message
    }
}

function success(message,data){
    return{
        code: http_codes.ok,
        message:  message,
        data : data
    }
}

module.exports = { errorResponse,success };