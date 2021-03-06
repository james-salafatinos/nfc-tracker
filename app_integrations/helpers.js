const axios = require("axios");
const key =
  process.env.RESCUE_TIME_KEY || require("../config.json")["rescue_time_key"];
var path = require("path");
var scriptName = path.basename(__filename);
console.log(`Running ${scriptName}...`);

//Async request to url
const grab_url = async (url) => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.log(
      "Error on getting data from: " + scriptName + ", with URL: " + url
    );
  }
};

//Gets date like 8/18/2020 with an optional shift days
const get_date_as_str = function (shift_days = 0, mode = "") {
  const today = new Date();
  if (shift_days < 0) {
    today.setDate(today.getDate() + shift_days);
  }
  if (mode == "rescue_time") {
    let strDate = "Y-m-d"
      .replace("Y", today.getFullYear())
      .replace("m", today.getMonth() + 1)
      .replace("d", today.getDate());
    return strDate;
  } else {
    let strDate = "m/d/Y"
      .replace("Y", today.getFullYear())
      .replace("m", today.getMonth() + 1)
      .replace("d", today.getDate());
    return strDate;
  }
};

//Gets a list of dates spanning a given number i.e.
//['8/13/2020', '8/12/2020', '8/11/2020']
const get_date_span = function (number_of_dates = 30) {
  const date_entries = Array.from(Array(number_of_dates).keys());
  const dates_allowed = date_entries.map((date) => get_date_as_str(-date));
  return dates_allowed;
};

//Validates the integrations
const validate = function (potential_data) {
  if (!potential_data) {
    throw "No Data Passed to Validation...";
  }
  console.log(`Validating ${potential_data.length} data sources...`);
  for (let i = 0; i < potential_data.length; i++) {
    if (potential_data[i].length > 0) {
      console.log(
        `Data Source [${i}] has ${potential_data[i].length} items :: SUCCESS )`
      );
    } else {
      console.log(
        `Data Source [${i}] has ${potential_data[i].length} items:: FAILURE )`
      );
    }
  }
};

//Gets rescue_time_urls
const get_rescue_time_url = function (shift_days_begin = 0) {
  return `https://www.rescuetime.com/anapi/data?key=${key}&by=interval&restrict_begin=${get_date_as_str(
    shift_days_begin,
    (mode = "rescue_time")
  )}&restrict_end=${get_date_as_str(0, (mode = "rescue_time"))}&format=csv`;
};

module.exports = {
  grab_url: grab_url,
  get_date_as_str: get_date_as_str,
  get_date_span: get_date_span,
  validate: validate,
  get_rescue_time_url: get_rescue_time_url,
};
