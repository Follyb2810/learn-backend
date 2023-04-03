const allowesOrigin = require('./allowedOrigins')


const corsOptions={
    origin:(origin,callback)=>{
        if(allowesOrigin.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        }else{
            callback(new Error("not allowed cors"))
        }
    },
    credentials :true,
    optionsSuccessStatus:200
}



module.exports =corsOptions