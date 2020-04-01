const express =  require("express");
const router = express.Router();
const middleware = require('./middleware');
const action = require("./action");


router.post('/add', [middleware.ValidateReqBody],(req,res)=>{
    action.addUser(req)
            .then((response)=>{
                res.status(response.code).send(response);
            });
});

router.get('/:id',[middleware.validateObjectId],(req,res)=>{
    action.getById(req)
            .then((response)=>{
                res.status(response.code).send(response);
            });
});

router.get('',(req,res)=>{
    action.getUsers(req)
            .then((response)=>{
                res.status(response.code).send(response);
            });
});

router.put('/update/:id',[middleware.validateObjectId,middleware.ValidateReqBody],(req,res)=>{
    action.updateUser(req)
            .then((response)=>{
                res.status(response.code).send(response);
            });
});

router.delete('/delete/:id',[middleware.validateObjectId],(req,res)=>{
    action.deleteUSer(req)
            .then((response)=>{
                res.status(response.code).send(response);
            });
});

module.exports = router;