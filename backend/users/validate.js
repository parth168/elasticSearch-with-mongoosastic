const { message } = require('./constant');

function validateEmail(email){
    const regExpEmail=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(!regExpEmail.test(email.trim())){
      return message.invalid_email;
    }
    else{
      return '';
    }
}

module.exports = { validateEmail };