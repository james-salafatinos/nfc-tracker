const ds = require("./DataSource");

_url_ =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSyBOLNq8rRq9TXblX7P-hPjUgFV9E5hEIQubr16xAjsG9w4MN3hCEKyTX1Q2j94L9_ME-ecCmxiD5Q/pub?&output=csv";

_url_2 =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXEatFcvB9zGP-TUtCFCdXbUboT1_7ZW-7j1ZiYu3ayTvJAqRJ9n54QQrTtYHdaZi3bjv4oVAQ6bHF/pub?gid=0&single=true&output=csv";
sleep = new ds(_url_, (key = ""), (date_span = 30));
habits = new ds(_url_2, (key = ""), (date_span = 30));

Promise.all([sleep.fetch(), habits.fetch()]).then((data) => {
  if (data[0]) {
    //console.log(data[0]);
    console.log("sleep :: SUCCESS");
  } else {
    console.log("sleep :: FAILURE");
  }
  if (data[1]) {
    console.log(data[1]);
    console.log("habits :: SUCCESS");
  } else {
    console.log("habits :: FAILURE");
  }
});
