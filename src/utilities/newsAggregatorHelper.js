const fs = require('fs');
const path = require('path');
const userData = require('../controller/user.json')

function readFromFile(){
    let readPath = path.join(__dirname, userData);
    let usersData = fs.readFileSync(readPath,{encoding: 'utf-8', flag: 'r'});
    return JSON.parse(usersData);
}

function writeToFile(data){
    let writePath = path.join(__dirname, '.', userData);
    fs.writeFileSync(writePath, JSON.stringify(data),{encoding: 'utf8',flag:'w'});
}


module.exports = {readFromFile, writeToFile}