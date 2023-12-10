const newsAPIController = require('express').Router()
const bcrypt = require('bcrypt');
const User = require('../models/user')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const { ENVConfig } = require("../config");

try{
    mongoose.connect("mongodb://localhost:27017/userdb", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log("connected to DB")
}catch(err){
    console.log("Error connecting to DB")
}

newsAPIController.post('/register', async (req,res)=> {
    const userDetails = req.body
    const hashedPassword = await bcrypt.hash(userDetails.password, 8)
    
    const user = new User({
        fullName: userDetails.fullName,
        email: userDetails.email,
        role: userDetails.role,
        password: hashedPassword,
        createdOn: new Date(),
        preferences: userDetails.preferences
    })
    user.save().then(data=>{
        return res.status(200).json({mesage: "user saved successfully"})
    }).catch(err=> {
        return res.status(500).json({message: `User saving failed ${err}`})
    })
})

newsAPIController.post('/login', async (req, res)=> {
    const emailPassed = req.body.email
    const passwordPassed = req.body.password

    User.findOne({
        email: emailPassed
    }).then(user=>{
        const passwordIsValid = bcrypt.compareSync(passwordPassed, user.password)
        if(!passwordIsValid){
            return res.status(401).json({message:"Invalid Password"})
        }
        
        const token = jwt.sign({ id: user.id }, ENVConfig.JWT_Secret_Key, {expiresIn: 86400})

        return res.status(200).json({
            user: { id: user.id },
            message: "Login Successful",
            accessToken: token
        })
    }).catch(err=>{
        console.error("Error during login", err)
        return res.send(404).json({message: "User not found"})
    })
})

newsAPIController.get('/preferences', (req, res)=> {

})

module.exports = newsAPIController