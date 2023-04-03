const mongoose =require('mongoose')

module.exports = mongoose.model("Employee",{
    fullName:{type:String},
    position:{type:String},
    location:{type:String},
    salary:{type:Number},
})

























// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt')

// const userSchema =mongoose.Schema({
//     name:{
//         type: String,
//         required: true
//     },
//     email:{
//         type: String,
//         required: true,
//         unique: true
//     },
//     password:{
//         type: String,
//         required: true
//     },
//     IsAdmin:{
//         type: Boolean,
//         required: true,
//         default: false
//     },
//     pic:{
//         type: Boolean,
//         required: true,
//         // default: `https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg`
//     },
// },
// {
//     timestamps: true,
// }
// )
// // ! to decrypt
// userSchema.pre("save",async function(next){
// if(!this.isModified("password")){
//     next();
// }
// const salt=await bcrypt.genSalt(10)
// this.password=await bcrypt.hash(this.password,salt)
// })
// // !to devrypt
// userSchema.methods.matchPassword =async function (enterpassword) {
//     return await bcrypt.compare(enterpassword,this.password)
// }

// const User = mongoose.model('User',userSchema)
// module.exports=User