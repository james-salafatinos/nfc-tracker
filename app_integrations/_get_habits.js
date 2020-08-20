const cheerio = require("cheerio");
const axios = require("axios");
const d3 = require("d3");
var request = require("request");
var path = require("path");
var scriptName = path.basename(__filename);
console.log(`Running ${scriptName}...`);

//async request to rescue time server
const getHabits = async (_url_) => {
  try {
    return await axios.get(_url_);
  } catch (error) {
    console.log("Error on getting data from habits");
  }
};

//async return response and d3 parse
const convertHabits = async (_url_) => {
  function _get_date_str(shift_days = 0) {
    const today = new Date();

    //shift the days if we want to get another date for easy time range
    if (shift_days < 0) {
      today.setDate(today.getDate() + shift_days);
    }

    let strDate = "m/d/Y"
      .replace("Y", today.getFullYear())
      .replace("m", today.getMonth() + 1)
      .replace("d", today.getDate());
    return strDate;
  }

  const response = await getHabits(_url_);
  let df = d3.csvParse(response.data, d3.autoType);

  //Create "Keep" filter for dates to display the 28 habit view
  const date_entries = Array.from(Array(29).keys());
  const dates_allowed = date_entries.map((date) =>
    _get_date_str((shift_days = -date))
  );

  //Filter data for last 4 weeks
  filteredData = df.filter(function (d) {
    if (dates_allowed.includes(d.CalendarDate)) {
      return d;
    }
  });

  return filteredData;
};

module.exports.df = function (_url_) {
  return Promise.resolve(convertHabits(_url_));
};
