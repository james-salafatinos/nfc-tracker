const bodyParser = require("body-parser");
const db_crud = require("../models/db_crud.js");
const express = require("express");
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

// url set, that posts to the database
router.post("/", function (req, res) {
  const body = req.body;
  db_crud
    .addUser(req.body)
    .then((obj) => {
      res.status(200);
      res.send(
        `Your url you provided was:\n ${body.user_urls}\n\n Your dashboard page is:\n http://nfc-tracker.herokuapp.com/${body.user}`
      );
    })
    .catch((error) => {
      res.status(500).json({ message: "Error with adding user to DB" });
    });
});

//Simple signup page that renders a signup html, eventually
//Leading to a post request for user and URL adding to database
router.get("/", function (req, res) {
  let data = {};
  res.render("../views/pages/signup", { data: data });
});

module.exports = router;
