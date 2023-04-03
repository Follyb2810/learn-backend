const {format}=require('date-fns')
const {v4:uuid}=require('uuid')
const fs = require('fs')
const fsPromise = require('fs').promises
const path = require('path')


const logEvent=async(message,logName) => {
    const dateTime=`${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`
    const logItem=`${dateTime} \t${uuid()}\t${message}\n`
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname,'logs'))){
            await fsPromise.mkdir(path.join(__dirname,'logs'))
        }
        await fsPromise.appendFile(path.join(__dirname,'logs','eventlogs'),logName)
    }catch(err){console.log(err)}
}

module.exports = logEvent
// logEvent("we are here")
// console.log(format(new Date(),'yyyyMMdd\tHH:mm:ss'))
// console.log(uuid())