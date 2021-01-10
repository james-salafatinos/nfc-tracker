const bodyParser = require("body-parser");
const db_crud = require("../models/db_crud.js");
const express = require("express");
const bcrypt = require("bcrypt");
var router = express.Router();
router.use(bodyParser.json({ extended: true }));

// url set, that posts to the database

//Simple signup page that renders a signup html, eventually
//Leading to a post request for user and URL adding to database
router.get("/", function (req, res) {
  let data = {};
  res.render("../views/pages/vizzes", { data: data });
});



module.exports = router;
