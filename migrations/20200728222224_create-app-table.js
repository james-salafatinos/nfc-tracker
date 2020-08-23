exports.up = function (knex) {
  return knex.schema.createTable("logs", (tbl) => {
    tbl.increments();
    tbl.text("userID", 200);
    tbl.text("tag_id", 200);
    tbl.text("value", 600);
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("logs").dropTable("users");
};
