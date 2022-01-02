const ProjectInteractions = require('../models/project-interactions');
const express = require("express");
const router = express.Router();

router.get('/', (req, res, next)=>{
    const query = req.query;
    let filterQuery = {}; // For all case
    if(query['project'] && query['project'] != '__all__'){
        filterQuery['project'] = query['project']; // For specific project 
    }
    ProjectInteractions.find(filterQuery).then(data=>{
        res.json({
            message: 'Successful',
            data: data,
        })
    }).catch(err=>{
        res.status(400).json({
            message: err ? err.message : 'Internal error',
        })
    })
});

router.post('/', (req, res, next)=>{
    res.json({
        message: "Interactions post called"
    })
});

module.exports.router = router;