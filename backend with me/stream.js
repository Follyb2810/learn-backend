const fs =require("fs");
const rs=fs.createReadStream('./file/lorem.txt',{encoding: 'utf8'});
const ws=fs.createWriteStream('./file/newlorem.txt')

rs.on('data',(data) => {ws.write(data)})  // writig large
rs.pipe(ws);  // to pass texr