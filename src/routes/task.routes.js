const express = require('express');
const Authmiddleware = require('../middlewares/Authmiddleware');
const TaskRouter = express.Router();
const jwt = require('jsonwebtoken');
const {TaskModel} = require('../models');
TaskRouter.get('/',Authmiddleware,async(req,res)=>{
    try {
        const userId = req.user;
        // console.log(userId,req.user,'checkuser')
        const tasks = await TaskModel.find({userId})
        res.send(tasks);
    } catch (error) {
        res.status(501).send(error.message)
    }
})
TaskRouter.post('/',Authmiddleware,async(req,res)=>{
    try {
        const userId = req.user;
        let newTask = await TaskModel.create({...req.body,userId});
        res.send(newTask)

    } catch (error) {
        res.status(501).send(error.message);
    }
}) 
TaskRouter.delete('/:id',Authmiddleware,async(req,res)=>{
    const {id} = req.params;
    try {
        const taskItem = await TaskModel.findByIdAndDelete(id);
        res.send({
            taskItem,
            msg:"Successully deleted"
        });
    } catch (error) {
        res.status(501).send(error.message)
    }
})
module.exports = TaskRouter;