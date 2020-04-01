exports.http_codes = {
    ok:200,
    bad_request:400,
    unauthorized:401,
    forbidden:403,
    internalServerError : 500
};

exports.message = {
    invalid_request_body : "Request Body Not containing all require field.",
    invalid_email : "Enter valid Email_Id.",
    already_exsist_user : "User already registered.",
    internalServerError : "Internal server Error.",
    addedData : "Data added.",
    invalid_email : "Please Enater Valid Mail.",
    invalid_Id : "Invalid User Id.",
    data_Not_Exist : "No Data available.",
    data_Updated : "Updated Successfully.",
    userDetails : "User Details.",
    data_Deleted : "Deleted Successfully.",
    user_Data : "User data."
};

exports.models = {
    user : "Users"
}