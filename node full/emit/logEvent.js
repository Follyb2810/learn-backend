const {format} =require('date-fns')
const fs=require('fs')
const fsPromise=require('fs').promises
const path=require('path')
let date=format(new Date (),'yyyyMMdd\tHH:mm:ss')
const {v4:uuid} = require('uuid') //! with uuid obj
const logEvent=async(message)=>{
    const dateTime=`${date}`
    const logItem =`${dateTime}\t${uuid()}\t${message}\n`
    console.log(logItem)

    try {
        if(!fs.existsSync(path.join(__dirname,'logs'))){
            await fsPromise.mkdir(path.join(__dirname,'logs'))
        }
       await fsPromise.appendFile(path.join(__dirname,'logs','eventLog.txt'),logItem)
    }catch(err){
        console.log(err)
    }
}

module.exports = logEvent










// console.log(uuid()) //! //! with uuid
// console.log(date)