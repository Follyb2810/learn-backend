const express = require('express');
const router = require('express').Router();
const { getAllUser } =require('../controllers/userController')
// const userController =require("../controllers/userController")

router.route('/')
                .get(getAllUser)
        // .get(userController.getAllUser)
        // .post(userController.createNewUser)
        // .patch(userController.updateUser)
        // .delete(userController.deleteUser)


        module.exports=router