// require('dotenv').config();
const mongoose = require('mongoose')
const url = process.env.MONGO_URL
const makeConnection = ()=>{mongoose.connect("mongodb://localhost:27017/test")
.then ((res)=>{
    // console.log(res);
    console.log("data base connncted succesfully")

})
.catch((e)=>
{
    console.log("database connction error " )
    console.log(e);
}
)
}


module.exports = makeConnection
