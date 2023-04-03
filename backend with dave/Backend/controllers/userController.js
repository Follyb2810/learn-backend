// const User =require("../models/User")
// const Note =require("../models/Note")
const User =require('../models/User')
const Note =require('../models/Note')
const asyncHandler=require("express-async-handler")
const bcrypt = require("bcrypt")

//get all user
//get a
// access private


const getAllUser=asyncHandler(async(req,res)=>{
    const users =await User.find().select("-passwod").lean()
    if(!users){
        return res.status(400).json({message: "User not found"})
    }
    res.json(users)
})

//* creating new user
// const createNewUser=asyncHandler(async(req,res)=>{
//     const {username,password,roles} = req.body

//     //!confirm data
//     if(!username || !password || !Array.isArray(roles) || !roles.length){
//       res.status(400).json({message: "all fields are require"})
//     } 

//     //! check duplicate
//     const duplicate=await User.findOne({username}).lean().exec()
//     if(duplicate){
//         return res.status(409).json({message: "duplicate username"})
//     }

//     //! hash password using bcrypt
//     const hashPwd = await bcrypt.hash(password,10)
//     const userObject={username,"password":hashPwd,roles}

//     //!creating ans storing new user
//     const user=await User.create(userObject)

//     if(user){
//         //! create
//         res.status(201).json({message: `new user ${username}`})
//     }else{
//         res.status(400).json({message: "invalid user name"})
//     }
    
// })
//* updating the user
// const updateUser=asyncHandler(async(req,res)=>{
//     const {id,username,roles,active,password}=req.body
  
//         //!confirm data
//     if(!id || !username || !Array.isArray(roles) || !roles.length ||typeof active !== 'boolean'){
//         return res.status(400).json({message:'all field are require'})
//     }
//     const user = await User.findById(id).exec()
//     if(!user){
//         return res.status(400).json({message:'user not found'})
//     }
//     //! check duplicate
//     const duplicate = await User.findOne({username}).lean().exec()
//       //* allowed update to the original user
//       if(duplicate && duplicate?._id.toString() !== id){
//         return res.status(409).json({message:'duplicate name'})
//       }

//       user.username =username
//       user.roles =roles
//       user.active =active
//       if(password){
//         //! hash password
//         user.password = await bcrypt.hash(password,10)
//       }

//       const updateUser = await user.save()
//       res.json({message:`${updateUser.username} is updated`})
// })
//* deleying user
// const deleteUser=asyncHandler(async(req,res)=>{
//     const {id} =req.body
//      if(!id){
//         return res.status(400).json({message:'user id require'})
//      } 
//      const notes =await Note.find({user:id}).lean().exec()
//      if(notes?.length){
//         return res.status(400).json({message:'user have assigned note'})
//      }
//      const user = await User.findById(id).exec()
//      if(!user){
//         return res.status(404).json({message:'user not found'})
//      }
//      const result = await user.deleteOne()
//      const reply=`username ${result.username} with ID ${result._id} deleted`
//         res.json(reply)
//     })

module.exports={getAllUser,createNewUser,updateUser,deleteUser}