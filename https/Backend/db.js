const mongoose=require("mongoose")
const dburl=`mongodb+srv://follyb:Alabi2810@cluster0.han9mga.mongodb.net/employee_db?retryWrites=true&w=majority`
mongoose.set("strictQuery",false)
module.exports=()=>{
    return mongoose.connect(dburl,
        { useNewUrlParser: true, useUnifiedTopology: true }
        )
}

// ! first way
// const connectDb = async()=>{
//     try{
//         const con = await mongoose.connect(`mongodb+srv://follyb:Alabi2810@cluster0.han9mga.mongodb.net/?retryWrites=true&w=majority`,{
//             useUnifiedTopology: true,
//             useNewUrlParser: true,
//             // useCreateIndex: true,
//         })
//         console.log(`mongodb connect: ${con.connection.host}`)
//     }catch(error){
//   console.error(error)
//   process.exit()
//     }
// }
// module.exports = connectDb