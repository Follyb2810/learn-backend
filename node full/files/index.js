const fs =require('fs');
const path=require('path');

// fs.readFile('./starter.txt','utf8',(err,data)=>{
// fs.readFile(path.join('starter.txt'),'utf8',(err,data)=>{
//     if(err) throw err
//     console.log(data)
// })
// fs.writeFile(path.join('reply.txt'),'nice to meet you folly',(err)=>{
//     if(err) throw err
//     console.log('write complete reply')
// })
// fs.appendFile(path.join('test.txt'),'nice to meet you folly is appending',(err)=>{
//     if(err) throw err
//     console.log('append reply')
// })
// fs.rename(path.join('reply.txt'),path.join('testrename.txt'),(err)=>{
//     if(err) throw err
//     console.log('rename to rename reply')
// })

// //! exist on uncaucht errored
// process.on('uncaughtException',err =>{
//     console.error('there was an error')
//     process.exist(1)
// })

let name = "folly"
// console.log(name.slice(1,3))
if(name.slice(-1) === 'y'){
    console.log('no name specified')
}