const express=require('express')
const router=express.Router()
const objectId = require('mongoose').Types.ObjectId
const Employee =require("../model/employesMode")
const {generateCrude} =require("../service/index")
const employeeCrud =generateCrude(Employee)
const {validateDbid,raiseRecord404Error}=require("../middlewares/index")




router.get('/', (req, res,next) => {
    employeeCrud.getAll()
    .then(data =>res.send(data))
    .catch(err =>next(err))
})
router.get('/:id',validateDbid, (req, res,next) => {
    // if(objectId.isValid(req.params.id) == false){
    //     res.status(400).json({message: 'Invalid object id'})
    // }else
    employeeCrud.getById(req.params.id)
    .then(data =>{
        if(data){
            res.send(data)
        }else
         raiseRecord404Error(req,res)
            // res.status(404).json({message:"error no record found" +req.params.id})
        
    })
    .catch(err =>next(err))
})
router.post("/",(req,res,next)=>{
    employeeCrud.create(req.body)
    .then(data =>res.status(201).json(data))
    .catch(err =>next(err))
})
router.put("/:id",validateDbid,(req,res)=>{
    employeeCrud.update(req.params.id,req.body)
    .then(data =>{
        if(data){
            res.send(data)
        }else
         raiseRecord404Error(req,res)
            // res.status(404).json({message:"error no record found" +req.params.id})
        
    })
    .catch(err =>next(err))
})
router.delete("/:id",validateDbid,(req,res)=>{
    employeeCrud.delete(req.params.id)
    .then(data =>{
        if(data){
            res.send(data)
        }else
         raiseRecord404Error(req,res)
            // res.status(404).json({message:"error no record found" +req.params.id})
        
    })
    .catch(err =>next(err))
})
module.exports = router

































































// const AsyncHandler= require("express-async-handler");
// const User =require("../Models/userModel");
// const generateToken= require("../utils/generateToken");
// const registerUser =AsyncHandler(
//     async(req,res)=>{
//         const {  name,email,password,pic }= req.body;
//         const userExists = await User.findOne({ email})
//         if(userExists){
//             res.status(400);
//             throw new Error("User already exists") 
//         }
//         const user=await User.create({ name,email,password,pic })
//         if(user){
//             res.status(201).json({
//                  _id: user._id,
//                  name: user.name,
//                  email:user.email,
//                  isAdmin: user.isAdmin,
//                  pic: user.pic, 
//                  token:generateToken(user._id)
//             })
//         }else{
//             res.status(400)
//             throw new Error('error occuried')
//         }
//     }
// )

// const authUser = AsyncHandler(async(req,res)=>{
//     const {email, password}=req.body
//     const user= await User.findOne({ email})
//     if(user && (await user.matchPassword(password))){
//         res.json({
//             _id: user._id,
//             name: user.name,
//             email:user.email,
//             isAdmin: user.isAdmin,
//             pic: user.pic, 
//             token:generateToken(user.id),
//        })
//     }else{
//         res.status(400)
//         throw new Error('Invalid email and passowrd')
//     }
// })
// module.exports ={registerUser,authUser}  

// const jwt =require("jsonwebtoken")
// const employesMode = require('../model/employesMode')


// const generateToken = (id) => {
//   return jwt.sign({id},"follyb",{
//     expiresIn:"30d"})
// }

// module.exports=generateToken