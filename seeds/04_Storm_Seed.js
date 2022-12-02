/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('storm').del()
  await knex('storm').insert([
    {id: 1, is_active: true, type: 'Advisory', location: 'CCSFS', wind_speed: 65, wind_direction: 306, hail_diameter: 2.741, tornado_category: 'N/A', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02', user_id: 1},
    {id: 2, is_active: true, type: 'Clear', location: 'KSC', wind_speed: 73, wind_direction: 254, hail_diameter: 1.88, tornado_category: 'N/A', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02', user_id: 2},
    {id: 3, is_active: true, type: 'Warning', location: 'PSFB', wind_speed: 82, wind_direction: 111, hail_diameter: 1.366, tornado_category: 'N/A', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02', user_id: 2},
    
  ]);
  await knex.raw('select setval(\'storm_id_seq\', max(id)) from storm')
};
