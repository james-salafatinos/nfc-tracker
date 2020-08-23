const bodyParser = require("body-parser");
const db_crud = require("../models/db_crud.js");
const express = require("express");
const bcrypt = require("bcrypt");
var router = express.Router();
router.use(bodyParser.json({ extended: true }));

// url set, that posts to the database
router.post("/", function (req, res) {
  const body = req.body;
  let user_obj = {
    username: body.username,
    password: bcrypt.hashSync(body.password, 10),
  };

  let user_entry = new Promise((resolve, reject) => {
    db_crud
      .addUser(user_obj)
      .then((obj) => {
        console.log("This should be the addUser id... " + obj);

        res.status(200);
        res.send(
          `Thanks for signing up, ${body.username}, Your dashboard page will be:\n http://nfc-tracker.herokuapp.com/profiles/${body.username}`
        );
        resolve(obj);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error with adding user to DB" });
        reject({ message: "error with obj: " + obj });
      });
  });

  //Urls table
  user_entry.then((user_obj) => {
    let url_obj = {
      url: body.url,
      url_title: body.url_title,
      user_id: user_obj[0].id || user_obj, //Differing return types of the resolved object above from heroku and local
    };
    console.log("Url Obj to add ", url_obj);
    db_crud.addURLs(url_obj).then((obj) => {
      console.log("returned addURLs obj, ", obj);
    });
  });
});

//Simple signup page that renders a signup html, eventually
//Leading to a post request for user and URL adding to database
router.get("/", function (req, res) {
  let data = {};
  res.render("../views/pages/signup", { data: data });
});

//URLS
router.post("/urlstest", function (req, res) {
  console.log("Accessing urlstest POST request...");
  const body = req.body;
  console.log("Body of POST request:", body);
  db_crud
    .addURLs(req.body)
    .then((obj) => {
      console.log("Inside then of DB Crud ADD URLS", obj);
      res.status(200);
      res.send(
        `Your url you provided was:\n ${body.user_urls}\n\n Your dashboard page is:\n http://nfc-tracker.herokuapp.com/${body.user}`
      );
    })
    .catch((error) => {
      res.status(500).json({ message: "Error with adding user to DB" });
    });
});
router.get("/urlstest", function (req, res) {
  const body = req.body;
  db_crud
    .findURLsByUsername(req.body)
    .then((obj) => {
      res.status(200);
      res.send("urls test page");
    })
    .catch((error) => {
      res.status(500).json({ message: "Error with adding user to DB" });
    });
});

module.exports = router;
