const newsAPIController = require('express').Router()
const userData = require('../controller/user.json')

newsAPIController.get('/users', (req, res)=>{
    return res.status(200).send(userData)
})

module.exports = newsAPIController