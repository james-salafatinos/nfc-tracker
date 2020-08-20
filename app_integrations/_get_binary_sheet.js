const d3 = require("d3");
var path = require("path");
const helpers = require("./helpers");
var scriptName = path.basename(__filename);
console.log(`Running ${scriptName}...`);

//async return response and d3 parse
const convertSheet = async (_url_) => {
  let response = await helpers.grab_url(_url_);

  let df = d3.csvParse(response.data, d3.autoType);

  //Filter the data based on the date span
  let date_span = helpers.get_date_span(30);
  filteredData = df.filter(function (d) {
    if (date_span.includes(d.Date)) {
      return d;
    }
  });
  return filteredData;
};

module.exports.df = function (_url_) {
  return Promise.resolve(convertSheet(_url_));
};
