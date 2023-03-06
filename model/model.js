const mongoose=require('mongoose')
const urlSchemma=new mongoose.Schema({
    longUrl:{
        type: String,
        required: true,
        unique: true,
    },
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    shorturl:{
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: String,
        default: Date.now
    }
})
module.exports=mongoose.model("Url", urlSchemma)