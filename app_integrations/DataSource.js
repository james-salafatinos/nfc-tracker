const helpers = require("./helpers");
const d3 = require("d3");

class DataSource {
  constructor(url, key = "", date_span = 30, date_field, no_filter = false) {
    //Given
    this.url = url;
    this.key = key;
    this.date_span = helpers.get_date_span(date_span);
    //Internal
    this.column_names = [];
    this.viz_data = {};
    this.date_field = date_field;
    this.no_filter = no_filter;
  }

  _grab_url() {
    //returns a promise
    return helpers.grab_url(this.url);
  }

  async _parse() {
    //parses to csv
    let response = await this._grab_url();
    let df = d3.csvParse(response["data"], d3.autoType);
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
    //give back a promise to index.js, also don't filter it if its from rescue time (no filter flag)
    return await Promise.resolve(this._parse()).then(() => {
      if (this.no_filter) {
        return this.df;
      }
      let viz_data = this._filter();
      return viz_data;
    });
  }
}

module.exports = DataSource;
