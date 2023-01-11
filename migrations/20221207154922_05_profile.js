/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('profiles', (table)=>{
    table.increments('id').primary();
    table.integer('user_id').references('users.id');
    table.specificType('capeLightning', 'TEXT[]').defaultTo('{\'\'Port\'\',\'\'Cape Central\'\'}');
    table.specificType('kscLightning', 'TEXT[]').defaultTo('{\'\'LC-39\'\',\'\'SLF\'\'}');
    table.specificType('otherLightning', 'TEXT[]').defaultTo('{\'\'Astrotech\'\',\'\'CIDCO Park\'\'}');
    table.boolean('CCSFSLightningToggle', true);
    table.boolean('KSCLightningToggle', true);
    table.boolean('OtherLightningToggle', true)
    table.boolean('psfbLightningToggle', true);
    table.boolean('capeWind', true);
    table.boolean('kscWind', true);
    table.boolean('psfbWind', true);
    table.boolean('capeStorm', true);
    table.boolean('kscStorm', true);
    table.boolean('psfbStorm', true);
    table.boolean('windSplash', true);
    table.boolean('stormSplash', true);
    table.string('mode');
    table.string('accessibility');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('profiles')
};
