const axios = require("axios");
var path = require("path");
var scriptName = path.basename(__filename);
console.log(`Running ${scriptName}...`);

//async request to rescue time server
const grab_url = async (_url_) => {
  try {
    return await axios.get(_url_);
  } catch (error) {
    console.log(
      "Error on getting data from: " + scriptName + ", with URL: " + _url_
    );
  }
};

//Gets date like 8/18/2020 with an optional shift days
const get_date_as_str = function (shift_days = 0) {
  const today = new Date();
  if (shift_days < 0) {
    today.setDate(today.getDate() + shift_days);
  }
  let strDate = "m/d/Y"
    .replace("Y", today.getFullYear())
    .replace("m", today.getMonth() + 1)
    .replace("d", today.getDate());
  return strDate;
};

const get_date_span = function (number_of_dates = 30) {
  const date_entries = Array.from(Array(number_of_dates).keys());
  const dates_allowed = date_entries.map((date) => get_date_as_str(-date));
  return dates_allowed;
};

//Get list of Last 28 days that exist in the tracker

console.log(get_date_span(30));

module.exports = {
  grab_url: grab_url,
  get_date_as_str: get_date_as_str,
};
