
require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const db_crud = require('./models/db_crud.js')
const bodyParser = require('body-parser');


const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  
//Needed for post request
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', function(req, res){
  //log query
  console.log(req.query)
  //add it to the database
  db_crud.add(req.query)
  .then(obj =>{
    res.status(200).json(obj)
  })
  .catch(error =>{
    res.status(500).json({message: 'Error with adding to DB'})
  })
});

app.get('/api/addUser', function(req, res){
  //log query
  console.log(req.query)
  //add it to the database
  db_crud.addUser(req.query)
  .then(obj =>{
    res.status(200).json(obj)
  })
  .catch(error =>{
    res.status(500).json({message: 'Error with adding user to DB'})
  })
});


// Access the parse results as request.body
app.post('/signup', function(req, res){
  const body = req.body
  console.log('post body', body)
  console.log('post user', body.user)

  db_crud.addUser(req.body)
  .then(obj =>{
    res.status(200)
    res.send(`Your url you provided was:\n ${body.user_urls}\n\n Your dashboard page is:\n http://nfc-tracker.herokuapp.com/${body.user}`)
  })
  .catch(error =>{
    res.status(500).json({message: 'Error with adding user to DB'})
  })

})


app.get('/', function(req, res){
  let U = {rescue_time_url:'',
           rescue_time_day_url: '',
           habits_url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRXEatFcvB9zGP-TUtCFCdXbUboT1_7ZW-7j1ZiYu3ayTvJAqRJ9n54QQrTtYHdaZi3bjv4oVAQ6bHF/pub?gid=0&single=true&output=csv',
           weight_url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTYvOssSK6v8cAd9dxVxLIR08T2xHrLG-K8NT7lMTaCMYPgKcvzB_r1rIHrlpuITWxd4Q82XlQNDt5K/pub?output=csv',
           sleep_url:'https://docs.google.com/spreadsheets/d/e/2PACX-1vSyBOLNq8rRq9TXblX7P-hPjUgFV9E5hEIQubr16xAjsG9w4MN3hCEKyTX1Q2j94L9_ME-ecCmxiD5Q/pub?&output=csv',
  }

  //Gets all of the data 
  const rescue_time = require('./app_integrations/_get_rescue_time.js')
  const rescue_time_day = require('./app_integrations/_get_rescue_time_day.js')
  const habits = require('./app_integrations/_get_habits.js')
  const weight = require('./app_integrations/_get_weight.js')
  const sleep = require('./app_integrations/_get_sleep.js')
  

  Promise.all([
    rescue_time.df, 
    habits.df(U.habits_url), 
    weight.df(U.weight_url), 
    rescue_time_day.df, 
    sleep.df(U.sleep_url)]).then((data) => {

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
      //console.log('Data[4]', data[4])
      console.log('_get_sleep :: FAILURE')
    }
    res.render('pages/index', {'data':data})
  })
});

app.get('/samantha', function(req, res){
  const sheet = require('./app_integrations/_get_binary_sheet.js')
  let U = {headaches_url:'https://docs.google.com/spreadsheets/d/e/2PACX-1vTqgsxeKiU1_bjuRTQiG1nd7OwBJWX82Tt3yNGUHo2NznMiccxVEe0bJ13nilBW19HmPgVCrzyyOBnv/pub?output=csv',
  }
  Promise.all([
    sheet.df(U.headaches_url)]).then((data) => {
      if (data[0]){
        console.log('_get_binary_sheet :: SUCCESS')
      } else{
        console.log('_get_binary_sheet :: FAILURE')
      }
      //res.send(JSON.stringify(data))
        res.render('pages/index_samantha', {'data':data})
    })
  });


  app.get('/george', function(req, res){
    const sheet = require('./app_integrations/_get_binary_sheet.js')
    let U = {george_general:'https://docs.google.com/spreadsheets/d/e/2PACX-1vRR9MuUyT9xEszCDaRzZWuFb3T5TwBBVzGgPYf9StwqVKdMTobe-QFSJ8MUfPeIX2g09zMznC0MmX_i/pub?output=csv',
    }
    Promise.all([
      sheet.df(U.george_general)]).then((data) => {
        if (data[0]){
          console.log('_get_binary_sheet :: SUCCESS')
        } else{
          console.log('_get_binary_sheet :: FAILURE')
        }
  
        //res.send(JSON.stringify(data))
          res.render('pages/index_george', {'data':data})
      })
    });


app.get('/signup', function(req, res){
  let data = {}
  res.render('pages/signup', {'data':data})

  });

    
app.get('/data', function(req,res){
  //get data from db
  db_crud.find()
  .then(obj =>{
    res.status(200).json(obj)
  })
  .catch(error =>{
    res.status(500).json({message: 'Error finding in DB'})
  })
})


app.get('/Users', function(req,res){
  //get data from db
  db_crud.findAllUsers()
  .then(obj =>{
    res.status(200).json(obj)
  })
  .catch(error =>{
    res.status(500).json({message: 'Error finding Users in DB'})
  })
})

app.get('/profiles', function(req, res){
  //let data = [{"id":1,"user":"test","user_urls":"test","created_at":"2020-08-17T19:36:20.652Z","updated_at":"2020-08-17T19:36:20.652Z"},
  //{"id":2,"user":"testSamantha","user_urls":"['tests', 'anothertest']","created_at":"2020-08-17T19:44:33.412Z","updated_at":"2020-08-17T19:44:33.412Z"}]
  
  //get data from db
  db_crud.findAllUsers()
  .then(obj =>{
    res.status(200)  
    res.render('pages/profiles', {'data' : obj, 'stringdata' : JSON.stringify(obj)})
  })
  .catch(error =>{
    res.status(500).json({message: 'Error finding Users in DB'})
  })
  });


app.get('/profiles/:username', function(req,res){
  
  db_crud.findUserByUsername(req.params.username)
  .then(obj =>{
    const sheet = require('./app_integrations/_get_binary_sheet.js')
    let U = {user_url: obj.user_urls,}
    Promise.all([
      sheet.df(U.user_url)]).then((data) => {
        if (data[0]){
          console.log('_get_binary_sheet :: SUCCESS')
        } else{
          console.log('_get_binary_sheet :: FAILURE')
        }

    res.status(200)  
    res.render('pages/index_morph', {'data':data})
  })
  })
  .catch(error =>{
    res.status(500).json({message: 'Error finding Users in DB'})
  })
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


