const app =require('express')
const router = require('express').Router()
const path = require('path')
const employeesController =require('../../controllers/employeesContoller')
const data ={}
// const employees=require('../../model/data.json')
// data.employees=require('../../model/data.json')
router.route('/')
            .get(employeesController.getAllEmployees)
            .post(employeesController.createNewEmployees)
            .put(employeesController.updateEmployees)
            .delete(employeesController.deleteEmployees)

            router.route('/:id')
                    .get(employeesController.getEmployees)

module.exports =router