var express = require('express');
const db_crud = require('../models/db_crud.js')
var router = express.Router();

//Simple query to pull all nfc tag scans from database
router.get('/data', function(req,res){
    //get data from db
    db_crud.find()
    .then(obj =>{
      res.status(200).json(obj)
    })
    .catch(error =>{
      res.status(500).json({message: 'Error finding nfc scans in DB'})
    })
  })
  
//Simple query to pull all users from database
router.get('/users', function(req,res){
    //get data from db
    db_crud.findAllUsers()
    .then(obj =>{
      res.status(200).json(obj)
    })
    .catch(error =>{
      res.status(500).json({message: 'Error finding Users in DB'})
    })
  })
  


  


module.exports = router;