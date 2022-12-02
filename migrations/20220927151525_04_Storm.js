/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('storm', table => {
        table.increments('id').primary();
        table.boolean('is_active', true);
        table.varchar('type', 20);
        table.varchar('location', 25);
        table.integer('wind_speed');
        table.integer('wind_direction');
        table.decimal('hail_diameter', 10, 3);
        table.varchar('tornado_category', 3);
        table.varchar('start', 25);
        table.varchar('end', 25);
        table.datetime('modified', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.integer('user_id').references('users.id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    // return knex.schema.alterTable('storm', (table) => {
    //     table.dropForeign('user_id')
    // })
    // .then(() => {
        return knex.schema.dropTableIfExists('storm');
    // })
  
};
