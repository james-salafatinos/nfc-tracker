var request = require("request");

var options = { method: 'GET',
  url: 'https://qsjames-3306.restdb.io/rest/habit-bull-csv-data-file-export',
  headers: 
   { 'cache-control': 'no-cache',
     'x-apikey': '337e9b34401b40843e1d7aab03ddb84760ad5' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});