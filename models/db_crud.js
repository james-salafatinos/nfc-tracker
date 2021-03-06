//Connects to database and determines which environment to use (development or prouction)
const db = require("../db_config");

module.exports = {
  add,
  find,
  findAllUsers,
  addUser,
  findUserById,
  findUserByUsername,
  change,
  findURLsByUserID,
  addURLs,
};

//add
async function add(obj) {
  return await db("logs").insert(obj, ["id"]);
}
//find
function find() {
  return db("logs");
}

//add
async function addUser(obj) {
  return await db("users").insert(obj, ["id"]);
}

//find users
function findAllUsers() {
  return db("users");
}

//find user by id
function findUserById(id) {
  return db("users").where({ id }).first();
}

//find user by id
function findUserByUsername(userID) {
  return db("users").where({ username: userID }).first();
}

function change(id, changes) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(() => {
      return findUserById(id);
    });
}

//add
async function addURLs(obj) {
  return await db("urls").insert(obj, ["id"]);
}

//find user by id
function findURLsByUserID(userID) {
  return db("urls").where({ user_id: userID }).first();
}
