const express = require('express');
const bodyParser = require('body-parser');
const employeeRoute =require('./Controller/employeeController')
const {errorHandler}=require('./middlewares/index')
const connectDb =require('./db')
// connectDb()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res) => {
    res.send("hello folly")
})
app.use('/api/employee',employeeRoute)
app.use(errorHandler)
// app.listen(5000,()=>console.log('listening on port 5000'))
connectDb()
.then(()=>{
    console.log("db connect");  
        app.listen(5000,()=>console.log('listening on port 5000'))
    
})
.catch(err=>console.log(err))