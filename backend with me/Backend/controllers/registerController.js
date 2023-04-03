const usersDb={
    users:require('../model/user.json'),
    setUsers:function(data){this.users = data;},
}
const fsPromise =require('fs').promises
const path=require('path')
const bcrypt = require('bcrypt');
// const { json } = require('express');

const handleNewUser =async(req,res)=>{
    const {user,pwd} =req.body
    if(!user,!pwd) return res.status(400).json({"message":"password and username is required"})
    //!check for duplicate
    // const duplicate =usersDb.users.find(person =>person.id === user)
    const duplicate = usersDb.users.find(person => person.id === user)
        if(duplicate) return res.sendStatus(409) //!conflict
        try{
        //! encrypt the password and
        const hashedPwd =await bcrypt.hash(pwd,10)
        //!store the new user
        const newUser ={'username':user,"passsword":hashedPwd}
        usersDb.setUsers([...usersDb.users,newUser])
        await fsPromise.writeFile(
            path.join(__dirname,'..','model','user.json'),
            JSON.stringify(usersDb.users)
            )
            console.log(usersDb.users);
            res.status(201).json({'succes':`new user${user} is created`})
        }catch(err){
            res.status(500)
        } 
}

module.exports = {handleNewUser}