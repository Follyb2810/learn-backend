const fs = require('fs')
const fsPromises = require('fs').promises
const path =require("path")


const fileOps=async()=>{
    try{
            const data=await fsPromises.readFile(path.join(__dirname,'file','follyPromise.txt'),"utf8")
            console.log(data);
            await fsPromises.unlink(path.join(__dirname,'file','follyPromise.txt')) //!delete
            await fsPromises.writeFile(path.join(__dirname,'file','Promise.txt'),data) //!join
            await fsPromises.appendFile(path.join(__dirname,'file','Promise.txt'),'\n\nyour hard drive is crash') //!rename
            await fsPromises.rename(path.join(__dirname,'file','Promise.txt'),path.join(__dirname,'file','PromiseFolly.txt')) //! readfile
            const newData=await fsPromises.readFile(path.join(__dirname,'file','PromiseFolly.txt'),"utf8")
            console.log(newData);
        }catch(err){
        console.log(err);
    }
}
fileOps()
// fs.readFile(path.join(__dirname,'file','Note.txt'),"utf8", (err,data)=>{
//     if(err) throw err
//     console.log(data)
// })
// fs.writeFile(path.join(__dirname,'file','Note1.txt'),'wlcome to dexentric', (err)=>{
//     if(err) throw err
//     console.log('write complete')

//     fs.appendFile(path.join(__dirname,'file','Note1.txt'),'/n/n we are here', (err)=>{
//         if(err) throw err
//         console.log('write to append complete')
//         fs.rename(path.join(__dirname,'file','Note1.txt'),path.join(__dirname,'file','newNote.txt'), (err)=>{
//             if(err) throw err
//             console.log('write to rename complete')
//         })
//     })
   
// })
// fs.appendFile(path.join(__dirname,'file','append.txt'),'wlcome to dexentric nice to meet you', (err)=>{
//     if(err) throw err
//     console.log('write append')
// })

process.on('uncaughtException',err=>{
    console.log("there was an uncaught exception");
    process.exit(1)
})