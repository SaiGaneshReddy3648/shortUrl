// required dependencies
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const logger = require('morgan')
const uuid=require('uuid')
const express=require('express')
const bodyParser = require("body-parser")
const app=express()
const port= process.env.PORTID || 2030

// setting view engine
app.set('view engine', 'ejs')
// setting vpaths
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: false }))

//connection to the database
const connect=require('./model/config')
connect()

//return the uniqe id to morgan
logger.token('id',function getId(req){
    return req.id   
})
// morgan logger format
app.use(logger(':id :method :url :status :res[content-length] - :response-time ms'))

// access.log will save the logs from the router
app.use(assignId)
function assignId (req, res, next) {
    req.id = uuid.v4()
    next()
}
app.use(logger('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'),{ flags: 'a'})
  }
))

// routing starts from "/" here
app.use("/",require("./routes/routes"))
// listening the port address
app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})