
exports.up = function(knex, Promise) {
    return knex.schema.createTable('stat', table => {
        table.date('date').notNullable();
        table.integer('hour').notNullable();
        table.integer('unix').notNullable();
        table.integer('traffic').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('stat');
};
