const cheerio = require('cheerio')
const axios = require('axios')
const d3 = require('d3')
var request = require('request');
//For logging purposes
var path = require('path');
var scriptName = path.basename(__filename);
console.log(`Running ${scriptName}...`)
//URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSyBOLNq8rRq9TXblX7P-hPjUgFV9E5hEIQubr16xAjsG9w4MN3hCEKyTX1Q2j94L9_ME-ecCmxiD5Q/pub?&output=csv'



const getSleep = async (_url_) => {
    //async request to rescue time server
    try{
        return await axios.get(_url_)
        
    }
    catch (error) {
        console.log('Error on getting data from habits')
    }
}

const convertSleep  = async (_url_) =>{
    console.log('inside convertSleep', _url_)
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
        
    const response = await getSleep(_url_)
    //console.log('_get_sleep response', response)
    let df = d3.csvParse(response.data, d3.autoType)

    //Get list of Last 28 days that exist in the tracker
    const date_entries = Array.from(Array(30).keys())
    const dates_allowed = date_entries.map(date => _get_date_str(shift_days = -date)); 
    console.log('dates_allowed',dates_allowed)
    

    //Actually do the filtering on the full dataset
    filteredData = df.filter(function(d) {
        //Filter data for last 4 weeks, for d.<> use the date field in the google sheet
        if (dates_allowed.includes(d.Date)){
            return d
        }

    })
    

    return filteredData
}

module.exports.df = function(_url_){
    return Promise.resolve(convertSleep(_url_));
}

