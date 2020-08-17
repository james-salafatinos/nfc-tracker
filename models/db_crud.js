//Connects to database and determines which environment to use (development or prouction)
const db = require('../db_config');

module.exports = {
    add,
    find
}

//add
async function add(obj){
    return await db('logs').insert(obj, ['id'])

}
//find
function find(){
    return db('logs')
}

function findByUser(id){
    return db('logs')
    .where({id})
    .first()
}