var express = require('express');
const db_crud = require('../models/db_crud.js')
var router = express.Router();

//Handle the nfc tag database entry requests
router.get('/add-nfc', function(req, res){
    console.log(req.query)
    db_crud.add(req.query)
    .then(obj =>{
      res.status(200).json(obj)
    })
    .catch(error =>{
      res.status(500).json({message: `Error on adding ${req.originalUrl} to DB in index.js`})
    })
  });

module.exports = router;