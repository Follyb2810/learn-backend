const usersDb={
    users:require('../model/user.json'),
    setUsers:function(data){this.users = data;},
}
const fsPromise =require('fs').promises
const path=require('path')
const bcrypt = require('bcrypt');

const handleLogin =async(req,res)=>{
    const {user,pwd}=req.body
    if(!user ||!pwd) return res.status(400).json({'message':'username and password is require'})
    const foundUser=usersDb.users.find(person => person.username === user)
    if(!foundUser) return res.sendStatus(401) //unauthorised
    //! evaluate password
     const match =await bcrypt.compare(pwd,foundUser.passsword)
     if(match){
        res.json({'success':`user ${user} is logged in!`})
     }else {
        //! where to create jwt
        res.sendStatus(401) 
     }
}


module.exports ={handleLogin}