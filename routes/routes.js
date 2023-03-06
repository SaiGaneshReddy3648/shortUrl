require('dotenv').config()
const express=require('express')
const router = express.Router()
const Url = require("../model/model")
const shortid=require('shortid')
const base=`http://localhost:${process.env.PORTID}/`

router.get('/',async(req,res)=>{
    shorturls=await Url.find()
    res.render('index',{shorturls:shorturls})
})


router.post("/short",(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message:"url can not be emplty!"
        })
        return
    }
    const shorturl=shortid()
    const longurl= new Url({
        longUrl: req.body.longUrl,
        shortId: shorturl,
        shorturl: base+shorturl,
        date: new Date()
    })
    longurl.save()
    .then(data=>{
        res.status(200).redirect('/')
    })
    .catch(err=>{
        res.status(500).render('error',{message: err.message})
    })
    
})

router.get("/:shortId", async(req, res)=>{
    try{
        const shortId=await Url.findOne({
            shortId : req.params.shortId
        })
        if(shortId){
            return res.redirect(shortId.longUrl)
        }else{
            return res.sendStatus(404)
        }
    }
    catch(err){
        res.status(500).render('error',{message: err.message})
    }
})

module.exports = router