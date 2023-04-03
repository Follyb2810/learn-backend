//! cors
// app.use(cors()) //! cross origin sharing
const whiteList =['http://localhost:3500','https://www.folly.com','http://127.0.0.1:5500','http://localhost:4500']
const corsOptions ={
    origin:(origin,callback)=>{
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        }
else{
    callback(new Error('Invalid origin not allowed by cors'))
}    },
OptionsSuccessStatus:200
}

module.exports =corsOptions