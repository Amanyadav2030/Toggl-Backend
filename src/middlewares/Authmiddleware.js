const {UserModel} = require('../models');
const jwt = require('jsonwebtoken'); 
async function Authmiddleware(req,res,next){
    try{ 
        const token = req.headers.authorization;
        if(!token){ 
            return res.status(401).send("Unauthorised")
        };
        const verification = jwt.verify(token,process.env.MAIN_TOKEN);
        const {id} = verification;
        let check = await UserModel.findById(id);
        req.user = check._id;
        if(check){
            next();
        }else{
            res.status(401).send("User not authenticated");
        }
    }catch(e){
        console.log(e);
        res.status(501).send(e);
    }
};
module.exports = Authmiddleware;