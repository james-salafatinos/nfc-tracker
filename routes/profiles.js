const bodyParser = require("body-parser");
const db_crud = require("../models/db_crud.js");
const express = require("express");
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
const helpers = require("../app_integrations/helpers");
const ds = require("../app_integrations/DataSource");

//Shows a list of all profiles that exist on the site
router.get("/", function (req, res) {
  db_crud
    .findAllUsers()
    .then((obj) => {
      res.status(200);
      res.render("../views/pages/profiles", {
        data: obj,
        stringdata: JSON.stringify(obj),
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error finding Users Get in DB" });
    });
});

//Handle a direct url lookup of a specific user
// Will show viz if exists, otherwise not
router.get("/:username", function (req, res) {
  db_crud
    .findUserByUsername(req.params.username)
    .then((obj) => {
      let user_defined = new ds(
        obj.user_urls,
        (key = ""),
        (date_span = 31),
        (date_field = "Date")
      );
      Promise.all([user_defined.fetch()]).then((data) => {
        helpers.validate(data);
        res.status(200);
        res.render("../views/pages/index_morph", { data: data });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error finding Users in DB" });
    });
});

module.exports = router;
