const express = require("express");
const users = require("../static/users");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
require('dotenv').config();  
const {usermodel} = require("../dbconfig/db.model")


const jwtsecretkey = process.env.jwtsecretkey;


async function hashpass(pass){
    const returnvalue = await bcrypt.hash(pass , 10);
    return returnvalue;
}
async function verifyPassword(plainPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;  // true if the passwords match, false if they don't
}

exports.login = async(req, res) => {
  console.log(req.body);

  if (!req.body) {
    res.status(400).json({ msg: "Data is invalid" });
  }

  const data = req.body;
      const user = await usermodel.findOne({username : data.username})

  // const user = users.find((item) => item.username === data.username);
  if (user) {
    const isValidPassword = await verifyPassword(data.password , user.password)
    if (isValidPassword) {
    //   res.json({ username: "logged in" });
      const token = jwt.sign(user.username , process.env.jwtsecretkey)
      console.log(token);
      const senddata = {username : user.username , token: token}
      res.status(200).json(senddata)
    } else res.json({ msg: "passeword is incrrect" });
  } else {
    res.json({ msg: "user not registerd" });
  }

  // res.json({username: data.username})
};
exports.logout = async(req, res) => {
    // for(let i = 0;i<users.length; i++){
        
    //     const temp = users[i].password
    //     const temp2= await hashpass(temp)
    //     console.log(temp2);
    //     users[i].password = temp2;

    // }
  res.json(users);
};


exports.register = async (req, res) => {
    const data = req.body;
    // console.log(data);
    const user = await usermodel.findOne({username : data.username})
    // const user = users.find((item)=>(item.username === data.username))
    if(user){
      console.log(user);
        res.json({msg: "user already exist "})
    }
    else {
        const hashedpass = await hashpass(data.password);
        const newuser = {username : data.username , password: hashedpass}
        await usermodel.create(newuser)
        // users.push(newuser);
        // console.log(users);
        res.json({msg: "registered "})

    }
//   res.json({ msg: "this is register controller" });
};
