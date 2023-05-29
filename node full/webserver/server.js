const logEvent =require('./logEvent')
const http =require('http')
const path = require('path')
const fs=require('fs')
const fsPromise = require('fs').promises
const EventEmitter = require('events')
const { sl } = require('date-fns/locale')

class Emitter extends EventEmitter {}

//! initializes object

const myEmitter = new Emitter()
myEmitter.on('log',(msg,fileName)=>logEvent(msg,fileName))

const PORT = process.env.PORT || 3500
 //! 
 const serveFile=async (filePath,ContentType,response)=>{
    try{

         const rawData = await fsPromise.readFile(filePath,
            !ContentType.includes("image")?'utf8':''
            )
         const data =ContentType === 'application/json'
          ? JSON.parse(rawData) :rawData
         response.writeHead(
            filePath.includes('404.html')?404 :200,
            {'Content-Type':ContentType})
         response.end(
            ContentType === 'application/json' ?
            JSON.stringify(data):rawData
            )
    }catch(err){
        console.log(err)
        myEmitter.emit('log',`${err.name}: ${err.message}`,'errLog.txt')
        response.statusCode=500
        response.end()
    }
}

const server =http.createServer((req,res)=>{
    console.log(req.method +' this is methid')
    console.log(req.url+' this is url')
    myEmitter.emit('log',`${req.method}\t ${req.url}`,'reqLog.txt')
    // myEmitter.on('log',(msg)=>logEvent(msg))
    // let path;
    // if(req.url === '/' || req.url === 'index.html')
        // {res.statusCode=200;
        // res.setHeader('Content-Type', 'text/html')
        //     path=path.join(__dirname,'views','index.html');
        //     fs.readFile(path, 'utf8', (err, data) => {
        //         res.end(data)
        //     })
    // }
    // switch(req.url){
    //     case '/':
    //         res.statusCode=200;
    //     res.setHeader('Content-Type', 'text/html')
    //         path=path.join(__dirname,'views','index.html');
    //         fs.readFile(path, 'utf8', (err, data) => {
    //             res.end(data)
    //         })
    //         break;
    // }


    const extension =path.extname(req.url)
    let ContentType;
    switch(extension){
        case '.css':
            ContentType='text/css';
            break
        case '.js':
            ContentType='text/javascript';
            break;
        case '.json':
            ContentType='application/json';
            break;
        case '.jpg':
            ContentType='image/jpeg';
            break;
        case '.png':
            ContentType='image/png';
            break;
        case '.txt':
            ContentType='text/plain';
            break;
        default:
            ContentType='text/html'; 
    }
    let filePath =
ContentType ==='text/html' && req.url ==='/'
            ?path.join(__dirname,'views','index.html')
            :ContentType === 'text/html' && req.url.slice(-1)=== '/'
              ?path.join(__dirname,'views',req.url,'index.html')
             :ContentType ==='text/html'
              ?path.join(__dirname,'views',req.url)
              :path.join(__dirname,req.url)


//! make .html extension not require

if(!extension && req.url.slice(-1) !== '/') filePath +=".html"

const fileExists =fs.existsSync(filePath)

if(fileExists){
  serveFile(filePath,ContentType,res)
}else{
    console.log(path.parse(filePath))
    switch(path.parse(filePath).base){
        case 'old-page.html':
        res.writeHead(301,{'Location':'/new-page.html'})
        res.end()
        break;
        case 'www-page.html':
        res.writeHead(301,{'Location':'/'})
        res.end()
        break;
        default:
            serveFile(path.join(__dirname,'views','404.html'),'text/html',res)
    }
}
})



server.listen(PORT,()=>console.log(`server listening on ${PORT}`))










//add listeners for the events
// myEmitter.on('log',(msg)=>logEvent(msg))

// setTimeout(()=>{
//     //! event emit
//     myEmitter.emit('log','log event emitted')
// },2000)