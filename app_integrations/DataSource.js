const helpers = require("./helpers");
const d3 = require("d3");

class DataSource {
  constructor(url, key = "", date_span = 30, date_field) {
    //Given
    this.url = url;
    this.key = key;
    this.date_span = helpers.get_date_span(date_span);
    //Internal
    this.column_names = [];
    this.viz_data = {};
    this.date_field = date_field;
  }

  _grab_url() {
    //returns a promise
    return helpers.grab_url(this.url);
  }

  async _parse() {
    //parses to csv
    let response = await this._grab_url();
    let df = d3.csvParse(response.data, d3.autoType);
    this.df = df;
    this.column_names = df.columns;
    return df;
  }

  _filter() {
    //Filter the data based on the date span
    let date_span = this.date_span;
    let date_field = this.date_field;
    let filteredData = this.df.filter(function (d) {
      if (date_span.includes(d[date_field])) {
        return d;
      }
    });
    return filteredData;
  }

  async fetch() {
    //give back a promise to index.js
    return await Promise.resolve(this._parse()).then(() => {
      let viz_data = this._filter();
      return viz_data;
    });
    //console.log("fetch, first");
  }
}
// _url_ =
//   "https://docs.google.com/spreadsheets/d/e/2PACX-1vSyBOLNq8rRq9TXblX7P-hPjUgFV9E5hEIQubr16xAjsG9w4MN3hCEKyTX1Q2j94L9_ME-ecCmxiD5Q/pub?&output=csv";

// rescue_time = new DataSource(_url_, (date_span = 30));

// Promise.resolve(rescue_time._parse()).then((data) => {
//   console.log(rescue_time._filter());
//   //console.log(rescue_time.df);
// });

// Promise.all([rescue_time.fetch()]).then((data) => {
//   console.log(data);
// });

module.exports = DataSource;
