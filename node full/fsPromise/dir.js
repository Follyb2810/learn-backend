
//!creating directory
const fs =require('fs');
if(!fs.existsSync('./new')){
    fs.mkdir('new',(err)=>{
        if(err) throw err;
        console.log('directory created')
    })
}

//!deletng the old directory
// const fs =require('fs');
if(!fs.existsSync('./new')){
    fs.rmdir('new',(err)=>{
        if(err) throw err;
        console.log('directory created')
    })
}