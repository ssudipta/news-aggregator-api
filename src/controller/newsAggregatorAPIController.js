const newsAPIController = require('express').Router()
const userData = require('../controller/user.json')
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { readFromFile, writeToFile } = require('../utilities/newsAggregatorHelper');

newsAPIController.get('/users', (req, res)=>{
    return res.status(200).send(userData)
})

newsAPIController.post('/register', async (req,res)=> {
    let userDetails = req.body
    let hashedPassword = await bcrypt.hash(userDetails.password, 8)
    let userInfo = {
        fullName: userDetails.fullName,
        email: userDetails.email,
        role: userDetails.role,
        password: hashedPassword,
        createdOn: new Date(),
        preference: userDetails.preference
    }

    // let userModified = readFromFile()
    let userModified = JSON.parse(JSON.stringify(userData))

    userModified.push(userInfo)
    
    let writePath = path.join(__dirname,'.','user.json')
    fs.writeFileSync(writePath, JSON.stringify(userModified), {encoding: 'utf8', flag: 'w'})
    // writeToFile(userModified)

    return res.status(200).send('User has been registered')
})

module.exports = newsAPIController