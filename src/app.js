const express = require('express')
const routes = require('express').Router();
const newsAPIController = require('./controller/newsAggregatorAPIController')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(routes);

const PORT = 3000;


function logger(req,res,next){
    console.log("Request received: ",req);
    console.log("Response sent: ",res);
    next();
}

app.use(logger);

routes.use('/news-aggregator/v1', newsAPIController)

app.get('/',(req,res)=>{
    return res.status(200).send("Hello from root")
})

app.listen(PORT, (err)=>{
    if(!err){
        console.log(`Server running on port ${PORT}`)
    }else{
        console.log("Some error encountered")
    }
})