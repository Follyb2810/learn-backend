const http=require('http')
const path=require('path')
const fs =require('fs')
const fsPromise=require('fs').promises
const logEvent =require('./LogItem/logEvent')
const EventEmitter = require('events')
const { response } = require('express')

class Emitter extends EventEmitter {}

//! initial ize of obect
const myEmitter = new Emitter()

//! listeming to log events
// myEmitter.on('logs',(msg)=>logEvent(msg))
// myEmitter.emit('logs','log event emmitt')

//! port
myEmitter.on('logs',(msg,fileName)=>logEvent(msg,fileName))
const PORT = process.env.PORT || 3500
const serveFile=async(filePath,contentType,response)=>{
    try{
        const rawData = await fsPromise.readFile(filePath, !contentType?'utf8':'')
        const data = contentType === 'application/json'?JSON.parse(rawData):rawData
        response.writeHead(filePath.includes('404.html')?404: 200,{'Content-Type':contentType})
        response.end( contentType ==='application/json'?JSON.stringify(data):data)

    } catch(err){
        console.log(err);
        myEmitter.emit('log',`${err.name}\: ${err.message}`,`errLog.txt`)
        response.statusCode=500
        response.end()
    }
}

const server=http.createServer((req,res)=>{
    console.log(req.url,req.method)
    myEmitter.emit('log',`${req.url}\t${req.method}`,`reqLog.txt`)
    // let path;
    // if(req.url ==='/' || req.url === 'index.html'){
    //     res.statusCode(200)
    //     res.setHeader('Content-Type','text/html')
    //     path=path.join(__dirname,'views','index.html')
    //     fs.readFile(path,'utf8',(err,data)=>{
    //         res.end(data)
    //     })
    // }



        //! using switch
    // switch(req.url){
    //     case '/':
    //         res.statusCode(200)
    //     res.setHeader('Content-Type','text/html')
    //     path=path.join(__dirname,'views','index.html')
    //     fs.readFile(path,'utf8',(err,data)=>{
    //         res.end(data)
    //     })
    // }

    const extension = path.extname(req.url)
    let contentType;

    switch(extension){
        case '.css':
            contentType='text/css';
            break;
        case '.js':
            contentType='text/javascript';
            break;
        case '.json':
            contentType='application/json';
            break;
        case '.jpg':
            contentType='image/jpg';
            break;
        case '.png':
            contentType='image/png';
            break;
        case '.txt':
            contentType='text/plain';
            break;
        default:
            contentType='text/html';
            break;
    }

    let filePath =
    contentType==='text/html' && req.url ==='/'
    ?path.join(__dirname,'views',"index.html")
    :contentType == 'text/html' && req.url.slice(-1) === '/' 
    ?path.join(__dirname,'views',req.url,'index.html')
    :contentType ==='text/html'
    ?path.join(__dirname,'views',req.url)
    :path.join(__dirname,req.url)

    //!make the .html not require in the browser 

    if(!extension &req.url.slice(-1) !== '/') filePath +='.html'
    const fileExists =fs.existsSync(filePath)

    if(fileExists){
        //! serve the file
        serveFile(filePath,contentType,res)
    }else{
        console.log(path.parse(filePath));
        switch(path.parse(filePath).base){
            case 'old-page':
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


server.listen(PORT,()=>console.log(`listen to port ${PORT}`))