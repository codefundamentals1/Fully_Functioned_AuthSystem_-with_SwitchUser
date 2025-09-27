const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    username :{
        type: String,
        required: true
    },
    password: {
        type : String,
        required: true
    }
})


const usermodel = mongoose.model("testusers" , userschema)

module.exports = {usermodel}