require('dotenv').config()
const mongoose = require("mongoose")
const connect=async()=>{
    const url=process.env.MONGODBURL
    mongoose.connect(url, { useNewUrlParser: true })
    const db = mongoose.connection
    db.once('open', _ => {
    console.log('Database connected')
    })

    db.on('error', err => {
    console.error('connection error:', err)
})
}
module.exports=connect