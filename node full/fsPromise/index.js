const fsPromise = require('fs').promises;
const path =require('path')

const fileOps=async ()=>{
    try{
        const data= await fsPromise.readFile(path.join('starter.txt'),'utf8')
        console.log(data)
        await fsPromise.unlink(path.join('starter.txt'),data)
        await fsPromise.writeFile(path.join('promisewrite.txt'),data)
        await fsPromise.appendFile(path.join('promisewrite.txt'),'\n\n appending folly')
        await fsPromise.rename(path.join('promisewrite.txt'),path.join('follyrename.txt'))
        const newdata= await fsPromise.readFile(path.join('follyrename.txt' ),'utf8')
        console.log(newdata)
    }catch(err){
        console.log(err)
    }
}

fileOps()