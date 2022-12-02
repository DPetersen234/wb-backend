/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('lightning').del()
  await knex('lightning').insert([
    {id: 1, is_active: false, type: 'Clear', location: 'Cape Central', category: 'N/A', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02',  user_id: 1},
    {id: 2, is_active: false, type: 'Clear', location: 'LC-39', category: 'N/A', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02',  user_id: 2},
    {id: 3, is_active: false, type: 'Clear', location: 'Port', category: 'N/A', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02',  user_id: 3},
    {id: 4, is_active: false, type: 'Clear', location: 'CX-20/16/LZ', category: 'N/A', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02',  user_id: 3},
    {id: 5, is_active: false, type: 'Clear', location: 'CX-37/ASOC/PPF', category: 'N/A', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02',  user_id: 3},
    {id: 6, is_active: false, type: 'Clear', location: 'CX-40/41/SPOC', category: 'N/A', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02',  user_id: 3},
    {id: 7, is_active: false, type: 'Clear', location: 'SLF', category: 'N/A', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02',  user_id: 3},
    {id: 8, is_active: false, type: 'Clear', location: 'KSC Industrial', category: 'N/A', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02',  user_id: 3},
    {id: 9, is_active: false, type: 'Clear', location: 'Astrotech', category: 'N/A', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02',  user_id: 3},
    {id: 10, is_active: false, type: 'Clear', location: 'CIDCO Park', category: 'N/A', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02',  user_id: 3},
    {id: 11, is_active: false, type: 'Clear', location: 'CX-36/46', category: 'N/A', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02',  user_id: 3},
    {id: 12, is_active: false, type: 'Clear', location: 'Patrick SFB', category: 'N/A', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02',  user_id: 3},

  ]);
  await knex.raw('select setval(\'lightning_id_seq\', max(id)) from lightning')
};
