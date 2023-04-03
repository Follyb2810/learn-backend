const express = require("express")
const app = express()
const fs = require('fs')
const path =require('path')
const cors = require('cors')
const corsOptions =require('./config/corsOptions')
const {logger} =require('./middleware/middleware')
const errorHandler= require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500


//! custom middleware
app.use(logger)

app.use(cors(corsOptions)) //! cross origin sharing
app.use(express.urlencoded({extended:false})) //!for form data
app.use(express.json()) //! for json
app.use(express.static(path.join(__dirname, '/public'))) //! for static files
app.use('/subdir', express.static(path.join(__dirname, '/public'))) //! make the public file open to subdir
app.use('/',require('./routes/root'))
app.use('/subdir',require('./routes/subdir'))
// app.use('/',require('./routes/register'))
app.use('/register',require('./routes/register'))
app.use('/auth',require('./routes/auth'))
app.use('/employees',require('./routes/api/employess'))
// app.get('^/&|/index(.html)?',(req,res)=>{
//     // res.sendFile('./views/index.html',{root:__dirname})
//     res.sendFile(path.join(__dirname,"..",'views','index.html'))
//     // res.send("hello")
// })
// app.get('/new-page(.html)?',(req,res)=>{
//     // res.sendFile('./views/index.html',{root:__dirname})
//     res.sendFile(path.join(__dirname,"..",'views','new-page.html'))
//     // res.send("hello")
// })
// app.get('/old-page(.html)?',(req,res)=>{
//     // res.sendFile('./views/index.html',{root:__dirname})
//     // res.sendFile(path.join(__dirname,"..",'views','new-page.html'))
//     // res.send("hello")
//     res.redirect(301,'/new-page.html')  //!302 by default
// })
//!route handler
app.get('/hello(.html)?',(req,res,next) => {
    console.log("attempted to load")
    next()
},(req,res) => {
    res.send("hello folly")
})
//! chaining route handlers using array
const one =(req,res,next) => {
    console.log("attempted to one")
    next()
}
const two =(req,res,next) => {
    console.log("attempted to two")
    next()
}
const three =(req,res) => {
    console.log("attempted to three")
    res.send('finished')
}
app.get('/chain(.html)?',[one,two,three])
//! app.use() or app.all()
app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){

        res.sendFile(path.join(__dirname,"..",'views','404.html'))
    }else if(req.accepts('json')){
        res.json({error:'404 not found'})
    }else{
        res.type('txt').send('404 not found')
    }
    // res.sendFile('./views/index.html',{root:__dirname})
    // res.send("hello")
})
app.use(errorHandler)
app.listen(PORT,()=>console.log("listening on port " + PORT))
