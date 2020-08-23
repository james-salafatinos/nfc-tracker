//HELP: Node Express Tutorial 8 - Creating a SQlite database using the Knex.js library
//https://www.youtube.com/watch?v=JWMf7AUzMkA&list=PLKii3VqdFnoZY6EBxb2K37D0wrEmS-5RD&index=6
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments(); //'id'
      tbl.text("username", 200);
      tbl.text("password", 500);
      tbl.timestamps(true, true);
    })

    .createTable("urls", (tbl) => {
      tbl.increments(); //'id'
      tbl.text("url", 5000);
      tbl.text("url_title", 50);
      tbl.timestamps(true, true);

      //Foreign key to Users table
      tbl
        .integer("user_id", 200)
        .unsigned()
        .references("id") //references 'id' in users table
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("urls").dropTableIfExists("users");
};
