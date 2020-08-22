exports.up = function (knex) {
  return knex.schema
    .createTable("logs", (tbl) => {
      tbl.increments();
      tbl.text("user", 200);
      tbl.text("tag_id", 200);
      tbl.text("value", 600);
      tbl.timestamps(true, true);
    })
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.text("user", 200);
      tbl.text("user_urls", 5000);
      tbl.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("messages").dropTableIfExists("_");
};
