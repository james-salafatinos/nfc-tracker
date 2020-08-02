
console.log('Running...')
const cheerio = require('cheerio')
const axios = require('axios')
const key = process.env.RESCUE_TIME_KEY || require('../config.json')['rescue_time_key']
const d3 = require('d3')
var request = require('request');




URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRXEatFcvB9zGP-TUtCFCdXbUboT1_7ZW-7j1ZiYu3ayTvJAqRJ9n54QQrTtYHdaZi3bjv4oVAQ6bHF/pub?gid=0&single=true&output=csv'
const getHabits = async () => {
    //async request to rescue time server
    try{
        return await axios.get(URL)
        
    }
    catch (error) {
        console.log('Error on getting data from habits')
    }
}

const convertHabits = async () =>{
    const response = await getHabits()
    let df = d3.csvParse(response.data)
    return df 
}

let df = convertHabits()

exports.df = df;
    