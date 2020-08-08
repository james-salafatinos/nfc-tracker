
const cheerio = require('cheerio')
const axios = require('axios')
const d3 = require('d3')
var request = require('request');

//For logging purposes
var path = require('path');
var scriptName = path.basename(__filename);
console.log(`Running ${scriptName}...`)



URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTYvOssSK6v8cAd9dxVxLIR08T2xHrLG-K8NT7lMTaCMYPgKcvzB_r1rIHrlpuITWxd4Q82XlQNDt5K/pub?output=csv'
const getWeight = async () => {
    //async request to rescue time server
    try{
        return await axios.get(URL)
        
    }
    catch (error) {
        console.log('Error on getting data from habits')
    }
}

const convertWeight  = async () =>{

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
        
    const response = await getWeight()
    let df = d3.csvParse(response.data, d3.autoType)

    //Get list of Last 28 days that exist in the tracker
    const date_entries = Array.from(Array(28).keys())
    const dates_allowed = date_entries.map(date => _get_date_str(shift_days = -date)); 

    //Actually do the filtering on the full dataset
    filteredData = df.filter(function(d) {
        //Filter data for last 4 weeks, for d.<> use the date field in the google sheet
        if (dates_allowed.includes(d.Date)){
            return d
        }
    
    })

    return filteredData
}

let df = convertWeight() 

exports.df = df;
