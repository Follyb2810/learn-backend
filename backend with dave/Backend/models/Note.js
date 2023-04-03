const mongoose =require("mongoose")
const AutoIncrement=require("mongoose-sequence")(mongoose)
const noteSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.objectId,
        required:true,
        ref :"User"
    },
    title: {
        type:String,
        required:true
    },
    text: {
        type:String,
        required:true,
    },
    complete: {
        type:Boolean,
        default:false
    },
},
{
    timestamps:true,
})

noteSchema.plugin(AutoIncrement,{
    inc_fields:"ticket",
    id:"ticketNums",
    start_seq:500
})

module.exports=mongoose.model("Note",noteSchema)