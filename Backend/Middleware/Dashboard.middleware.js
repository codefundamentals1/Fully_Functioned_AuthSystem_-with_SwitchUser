const users = require("../static/users")
const jwt = require("jsonwebtoken")
require('dotenv').config();
const secretkey = process.env.jwtsecretkey
const checkforRoute = (req, res, next)=>{
    // console.log(secretkey)
    
    const token  = req.headers['token']
    console.log(token)
    if(token){
    const decoded = jwt.verify(token ,secretkey, (err , decoded)=>{
        if(err){
            return res.json({msg : "user not verifed"})
        }
        else {console.log("in midd" ,decoded); req.body = decoded ; next()}
    })
}
else {
    return res.json({msg : "token not provided"})
    
}
}
module.exports = checkforRoute