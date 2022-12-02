/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('wind', table => {
      table.increments('id').primary();
      table.boolean('is_active', true);
      table.varchar('type', 20);
      table.varchar('location', 25);
      table.varchar('category', 20);
      table.varchar('warning', 20);
      table.varchar('start', 25);
      table.varchar('end', 25);
      table.datetime('modified', { precision: 6 }).defaultTo(knex.fn.now(6));
      table.integer('direction', 3);
      table.integer('max_speed', 3);
      table.integer('user_id').references('users.id');
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    // return knex.schema.alterTable('wind', (table) => {
    //     table.dropForeign('user_id')
    // })
    // .then(() => {
        return knex.schema.dropTableIfExists('wind');
    // })
  
}
