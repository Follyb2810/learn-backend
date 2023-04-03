const app =require('express')
const router = require('express').Router()
const path = require('path')

router.get('^/&|/index(.html)?',(req,res)=>{
    // res.sendFile('./views/index.html',{root:__dirname})
    res.sendFile(path.join(__dirname,"..",'views','index.html'))
    // res.send("hello")
})
router.get('/new-page(.html)?',(req,res)=>{
    // res.sendFile('./views/index.html',{root:__dirname})
    res.sendFile(path.join(__dirname,"..",'views','new-page.html'))
    // res.send("hello")
})
router.get('/old-page(.html)?',(req,res)=>{
    // res.sendFile('./views/index.html',{root:__dirname})
    // res.sendFile(path.join(__dirname,"..",'views','new-page.html'))
    // res.send("hello")
    res.redirect(301,'/new-page.html')  //!302 by default
}) 


module.exports =router