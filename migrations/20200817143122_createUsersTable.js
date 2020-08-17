
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments()
        tbl.text('user', 200)
        tbl.text('user_urls', 5000)
        tbl.timestamps(true,true)
    })
    
};

exports.down = function(knex) {
  
};
