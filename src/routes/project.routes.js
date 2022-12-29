const express = require('express');
const Authmiddleware = require('../middlewares/Authmiddleware');
const ProjectRoute = express.Router();
const jwt = require('jsonwebtoken');
const {ProjectModel} = require('../models');
ProjectRoute.get('/',Authmiddleware,async(req,res)=>{
    try {
        const userId = req.user;
        const project = await ProjectModel.find({userId});
        res.send(project);
    } catch (error) {
        res.status(501).send(error.message)
    } 
})
ProjectRoute.post('/',Authmiddleware,async(req,res)=>{
    try {
        const userId = req.user;    
        const newProject = new ProjectModel({...req.body,userId});
        await newProject.save()
        res.send(newProject);
    } catch (error) {
        res.status(501).send(error.message);
    }
})
ProjectRoute.delete('/:id',Authmiddleware,async(req,res)=>{
    const {id} = req.params;
    try {
        const projectItem = await ProjectModel.findByIdAndDelete(id);
        res.send({
            projectItem,
            msg:"Successully deleted"
        });
    } catch (error) {
        res.status(501).send(error.message)
    }
})
ProjectRoute.patch('/:id',Authmiddleware,async(req,res)=>{
    try {
         const {id} = req.params;
         const updateProject = await ProjectModel.findByIdAndUpdate(id,req.body);
         res.send(updateProject);
    } catch (error) {
        res.status(501).send(error.message);
    }
})
module.exports = ProjectRoute;