exports.up = function (knex) {
  return knex.schema.createTable("urls", (tbl) => {
    tbl.increments();
    tbl.integer("userID", 200);
    tbl.text("url", 5000);
    tbl.text("url_name", 50);
  });
};

exports.down = function (knex) {};
