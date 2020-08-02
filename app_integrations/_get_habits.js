
console.log('Running...')
const cheerio = require('cheerio')
const axios = require('axios')
const key = process.env.RESCUE_TIME_KEY || require('../config.json')['rescue_time_key']
const d3 = require('d3')


const { createAgent } = require("notionapi-agent")

//Notion Api Agent
const agent = createAgent()

async function main() {
   
  const pageId = "fb64b9a34c9d4cbf86bc15aa2c24dafe?v=53bb405553da46fc99f9f0d520175703"

  try {
    const result = await agent.getRecordValues({
      requests: [{ id: pageId, table: "block" }]
    })
    console.log(Object.keys(result.data))
  } catch (error) {
    console.log(error)
  }

}



// URL = 'https://www.notion.so/fb64b9a34c9d4cbf86bc15aa2c24dafe?v=53bb405553da46fc99f9f0d520175703'
// const getHabits = async () => {
//     //async request to rescue time server
//     try{
       
//         return await axios.get(URL)
        
//     }
//     catch (error) {
//         console.log('Error on getting data from RescueTime')
//     }
// }

// const convertHabits = async () =>{
//     // console.log(URL)
//     // console.log(_get_date_str(-7))
//     const response = await getHabits()
//     //let df = d3.csvParse(response['data'], d3.autoType)
//     //return df
//     return response.data
//     }  

// // let res = convertHabits().then((res) => {
// //     console.log(res)})

main()
