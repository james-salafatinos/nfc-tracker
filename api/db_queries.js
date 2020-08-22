var express = require("express");
const db_crud = require("../models/db_crud.js");
var router = express.Router();
const bodyParser = require("body-parser");
//Use body parser to enable handling post requests
router.use(bodyParser.json({ extended: true }));

//Simple query to pull all nfc tag scans from database
router.get("/data", function (req, res) {
  //get data from db
  db_crud
    .find()
    .then((obj) => {
      res.status(200).json(obj);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error finding nfc scans in DB" });
    });
});

//Simple query to pull all users from database
router.get("/users", function (req, res) {
  //get data from db
  db_crud
    .findAllUsers()
    .then((obj) => {
      res.status(200).json(obj);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error finding Users in DB" });
    });
});

// Edit the database
router.patch("/users/edit/:id", function (req, res) {
  const { id } = req.params;
  const changes = req.body;
  db_crud
    //"Change" is the db operation
    .change(id, changes)
    .then((obj) => {
      if (obj) {
        res.status(200).json(obj);
      } else {
        res.status(404).json({ message: "record not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error updating Users in DB" });
    });
});

//Simple query to pull all users from database
router.get("/users/:id", function (req, res) {
  console.log("get", req.params);
  const id = req.params;
  res.send(id);
});

module.exports = router;
