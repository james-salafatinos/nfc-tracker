console.log('Running...')
const cheerio = require('cheerio')
const axios = require('axios')
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

        //async return response and d3 parse
        function _get_date_str(shift_days = 0){
            const today = new Date()
        
            //shift the days if we want to get another date for easy time range
            if (shift_days < 0){
                today.setDate(today.getDate()+shift_days)
            }
                    
            let strDate = 'm/d/Y'
            .replace('Y', today.getFullYear())
            .replace('m', today.getMonth()+1)
            .replace('d', today.getDate());
            return strDate
        }
        
    const response = await getHabits()
    let df = d3.csvParse(response.data, d3.autoType)


    //Create "Keep" filter for dates to display the 28 habit view
    const date_entries = Array.from(Array(28).keys())
    const dates_allowed = date_entries.map(date => _get_date_str(shift_days = -date));
    filteredData = df.filter(function(d) {
        //Filter data for last 4 weeks
        if (dates_allowed.includes(d.CalendarDate)){
            return d
        }
    
    })
    
    return filteredData
}

let df = convertHabits()
console.log(df)

exports.df = df;
    