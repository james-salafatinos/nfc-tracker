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

//Homepage/index
var homepage = require("./routes/homepage");
app.use("/", homepage);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
