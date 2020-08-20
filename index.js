require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const db_crud = require("./models/db_crud.js");
const bodyParser = require("body-parser");
const helpers = require("./app_integrations/helpers");
const ds = require("./app_integrations/DataSource");

//For logging
var scriptName = path.basename(__filename);
console.log(`Running ${scriptName}...`);

//Setup Application
const app = express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs");

//Use body parser to enable handling post requests
app.use(bodyParser.urlencoded({ extended: true }));

//API Definition
var db_queries = require("./api/db_queries");
var add_nfc = require("./api/add_nfc");
app.use("/api", db_queries);
app.use("/api", add_nfc);

// Signup post request containing the user name and
// url set, that posts to the database
app.post("/signup", function (req, res) {
  const body = req.body;
  console.log("post body", body);
  console.log("post user", body.user);
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

//Home page
app.get("/", function (req, res) {
  let urls = {
    rescue_time_url: helpers.get_rescue_time_url(-7),
    rescue_time_day_url: helpers.get_rescue_time_url(0),
    habits_url:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXEatFcvB9zGP-TUtCFCdXbUboT1_7ZW-7j1ZiYu3ayTvJAqRJ9n54QQrTtYHdaZi3bjv4oVAQ6bHF/pub?gid=0&single=true&output=csv",
    weight_url:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYvOssSK6v8cAd9dxVxLIR08T2xHrLG-K8NT7lMTaCMYPgKcvzB_r1rIHrlpuITWxd4Q82XlQNDt5K/pub?output=csv",
    sleep_url:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSyBOLNq8rRq9TXblX7P-hPjUgFV9E5hEIQubr16xAjsG9w4MN3hCEKyTX1Q2j94L9_ME-ecCmxiD5Q/pub?&output=csv",
  };

  sleep = new ds(
    urls.sleep_url,
    (key = ""),
    (date_span = 30),
    (date_field = "Date")
  );

  habits = new ds(
    urls.habits_url,
    (key = ""),
    (date_span = 29),
    (date_field = "CalendarDate")
  );

  weight = new ds(
    urls.weight_url,
    (key = ""),
    (date_span = 28),
    (date_field = "Date")
  );

  rescue_time = new ds(
    urls.rescue_time_url,
    (key = ""),
    (date_span = 10),
    (date_field = "Date"),
    (no_filter = true)
  );

  rescue_time_day = new ds(
    urls.rescue_time_day_url,
    (key = ""),
    (date_span = 10),
    (date_field = "Date"),
    (no_filter = true)
  );

  Promise.all([
    rescue_time.fetch(),
    habits.fetch(),
    weight.fetch(),
    rescue_time_day.fetch(),
    sleep.fetch(),
  ]).then((data) => {
    helpers.validate(data);

    //Display site
    res.render("pages/index", { data: data });
  });
});

//Simple signup page that renders a signup html, eventually
//Leading to a post request for user and URL adding to database
app.get("/signup", function (req, res) {
  let data = {};
  res.render("pages/signup", { data: data });
});

//Shows a list of all profiles that exist on the site
app.get("/profiles", function (req, res) {
  db_crud
    .findAllUsers()
    .then((obj) => {
      res.status(200);
      res.render("pages/profiles", {
        data: obj,
        stringdata: JSON.stringify(obj),
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error finding Users in DB" });
    });
});

//Handle a direct url lookup of a specific user
// Will show viz if exists, otherwise not
app.get("/profiles/:username", function (req, res) {
  db_crud
    .findUserByUsername(req.params.username)
    .then((obj) => {
      user_defined = new ds(
        obj.user_urls,
        (key = ""),
        (date_span = 31),
        (date_field = "Date")
      );
      Promise.all([user_defined.fetch()]).then((data) => {
        helpers.validate(data);
        res.status(200);
        res.render("pages/index_morph", { data: data });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error finding Users in DB" });
    });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
