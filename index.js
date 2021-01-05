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

//API
var db_queries = require("./api/db_queries");
app.use("/api", db_queries);
var add_nfc = require("./api/add_nfc");
app.use("/api", add_nfc);

//Signup
var signup = require("./routes/signup");
app.use("/signup", signup);

//Profiles
var profiles = require("./routes/profiles");
app.use("/profiles", profiles);

//music
var music = require("./routes/music");
app.use("/music", music);


//Homepage/index
var homepage = require("./routes/homepage");
app.use("/", homepage);

app.post("/urlstest", function (req, res) {
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
app.get("/urlstest", function (req, res) {
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


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
