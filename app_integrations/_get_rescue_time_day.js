
const cheerio = require('cheerio')
const axios = require('axios')
const key = process.env.RESCUE_TIME_KEY || require('../config.json')['rescue_time_key']
const d3 = require('d3')

//For logging purposes
var path = require('path');
var scriptName = path.basename(__filename);
console.log(`Running ${scriptName}...`)






const getRescueTime = async () => {
    //async request to rescue time server
    try{
       
        return await axios.get(URL)
        
    }
    catch (error) {
        console.log('Error on getting data from RescueTime')
    }
}

const convertRescueTime = async () =>{
   
    //async return response and d3 parse
    function _get_date_str(shift_days = 0){
        const today = new Date()
    
        //shift the days if we want to get another date for easy time range
        if (shift_days < 0){
            today.setDate(today.getDate()+shift_days)
        }
                
        let strDate = 'Y-m-d'
        .replace('Y', today.getFullYear())
        .replace('m', today.getMonth()+1)
        .replace('d', today.getDate());
        return strDate
    }
    
    URL = `https://www.rescuetime.com/anapi/data?key=${key}&by=interval&restrict_begin=${_get_date_str(-2)}&restrict_end=${_get_date_str()}&format=csv`
    // console.log(URL)
    // console.log(_get_date_str(-7))
    const response = await getRescueTime()
    console.log(scriptName, response);
    let df = d3.csvParse(response['data'], d3.autoType)
    
    return df

}


let df = convertRescueTime()

exports.df = df;

