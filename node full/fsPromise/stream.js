const fs=require('fs');
const rs =fs.createReadStream('lorem.txt',{encoding:'utf-8'})
const ws =fs.createWriteStream('newlorem.txt');
// rs.on('data',(dataChunk) => ws.write(dataChunk))
rs.pipe(ws)