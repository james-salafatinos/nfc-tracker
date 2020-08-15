require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const logs_table = require('./models/db_crud.js')


const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  


app.get('/api', function(req, res){
  
  //log query
  console.log(req.query)

  //add it to the database
  logs_table.add(req.query)
  .then(obj =>{
    res.status(200).json(obj)
  })
  .catch(error =>{
    res.status(500).json({message: 'Error with adding to DB'})
  })
  //res.render('pages/index')
});



app.get('/', function(req, res){
  let U = {sleep_url:'https://docs.google.com/spreadsheets/d/e/2PACX-1vSyBOLNq8rRq9TXblX7P-hPjUgFV9E5hEIQubr16xAjsG9w4MN3hCEKyTX1Q2j94L9_ME-ecCmxiD5Q/pub?&output=csv',
           habits_url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRXEatFcvB9zGP-TUtCFCdXbUboT1_7ZW-7j1ZiYu3ayTvJAqRJ9n54QQrTtYHdaZi3bjv4oVAQ6bHF/pub?gid=0&single=true&output=csv'
  }

  
  const rescue_time = require('./app_integrations/_get_rescue_time.js')
  const rescue_time_day = require('./app_integrations/_get_rescue_time_day.js')
  const habits = require('./app_integrations/_get_habits.js')
  const weight = require('./app_integrations/_get_weight.js')
  const sleep = require('./app_integrations/_get_sleep.js')
  

  Promise.all([rescue_time.df, habits.df(U.habits_url), weight.df, rescue_time_day.df, sleep.df(U.sleep_url)]).then((data) => {
    //console.log('weight in .get', data[2])
    if (data[0]){
      console.log('_get_rescue_time :: SUCCESS')
    }
    if (data[1]){
      console.log('_get_habits :: SUCCESS')
    }
    if (data[2]){
      console.log('_get_weight :: SUCCESS')
    }
    if (data[3]){
      console.log('_get_rescue_time_day :: SUCCESS')
      //console.log('data4', data[3])
    }
    if (data[4]){
      console.log('_get_sleep :: SUCCESS')

    } else{
      console.log('Data[4]', data[4])
      console.log('_get_sleep :: FAILURE')
    }
  

    res.render('pages/index', {'data':data})//[0], 'habit_data': data[1], 'weight':data[2]})

 })
});

app.get('/data', function(req,res){
  //get data from db
  logs_table.find()
  .then(obj =>{
    res.status(200).json(obj)
  })
  .catch(error =>{
    res.status(500).json({message: 'Error finding in DB'})
  })
})

app.get('/article/:id', function(req , res){
  res.render('article' + req.params.id);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
