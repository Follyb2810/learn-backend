 const ObjectId=require("mongoose").Types.ObjectId

 const validateDbid =(req,res,next)=>{
    if(ObjectId.isValid(req.params.id)== false){
        res.status(400).json({message:`given object id is invalid ${req.params.id}`})
    }
    else 
    next()
 }
 const raiseRecord404Error=(req,res) => {
    res.status(404).json({message:"error no record found" +req.params.id})
 }
 const errorHandler=(error,req,res,next)=>{
    res.status(500).json({error:error})
 }
 module.exports ={validateDbid,raiseRecord404Error,errorHandler}