//Home page
const bodyParser = require("body-parser");
const db_crud = require("../models/db_crud.js");
const express = require("express");
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
const helpers = require("../app_integrations/helpers");
const ds = require("../app_integrations/DataSource");

router.get("/", function (req, res) {
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
    res.render("../views/pages/index", { data: data });
  });
});

module.exports = router;
