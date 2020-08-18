//Connects to database and determines which environment to use (development or prouction)
const db = require('../db_config');

module.exports = {
    add,
    find,
    findAllUsers,
    addUser,
    findUserById,
    findUserByUsername,
}

//add
async function add(obj){
    return await db('logs').insert(obj, ['id'])

}
//find
function find(){
    return db('logs')
}

//add
async function addUser(obj){
    return await db('users').insert(obj, ['id'])

}

//find users
function findAllUsers(){
    return db('users')
}


//find user by id
function findUserById(id){
    return db('users')
    .where({id})
    .first();
}

//find user by id
function findUserByUsername(user){
    return db('users')
    .where({user})
    .first();
}

