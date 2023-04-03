// require("dotenv").config()
require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors=require('cors')
const cookieParser = require('cookie-parser')
const {logger,logEvents} = require("./middleware/logger")
const errorHandler= require("./middleware/errorHandler")
const corsOptions = require('./config/corsOption')
const mongoose =require("mongoose")
const connectDb=require('./config/dbConnect')

connectDb()
const PORT = process.env.PORT || 3500
console.log(process.env.NODE_ENV + " why") 
const hostname = process.env.HOST;
const database = process.env.DATABASE;
const port = process.env.PORT;

console.log(hostname);
console.log(database);
console.log(port);

app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use("/",express.static(path.join(__dirname,"/public")))
// app.use(express.static("/public")) //! can still use this
app.use("/",require("./routes/root"))
app.use("/users",require("./routes/userRoutes"))
app.all("*",(req,res)=>{
    res.status(404)
    if(req.accepts("html")){
        res.sendFile(path.join(__dirname,"views","404.html"))
    }else if(req.accepts("json")){
        res.json({message:"404 not found"})
    }else {
        res.type("text").send("404 not found")
    }
})

app.use(errorHandler)


mongoose.connection.once("open",()=>{
        console.log('connect to mongoDb')
    app.listen(PORT,()=>console.log(`listening on ${PORT}`))
})

mongoose.connection.on('error',err=>{
    console.log(err)
    logEvents(`${err.no}:${err.code}\t${err.syscall}\t${err.host}`,'mongoErrLog.log')
})