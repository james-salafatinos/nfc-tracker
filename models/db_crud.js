const db = require('../db_config');

module.exports = {
    add,
    find
}

//add
async function add(obj){
    return await db('logs').insert(obj, ['id'])

}

function find(){
    return db('logs')
}