/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('wind').del()
  await knex('wind').insert([
    {id: 1, is_active: false, type: 'Clear',warning: 'N/A', location: 'CCSFS', category: '18 kt steady-state', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02', direction: 302, max_speed: 30, user_id: 1 },
    {id: 2, is_active: false, type: 'Clear',warning: 'N/A', location: 'CCSFS', category: '22 kt steady-state', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02', direction: 187, max_speed: 2, user_id: 2 },
    {id: 3, is_active: false, type: 'Clear',warning: 'N/A', location: 'CCSFS', category: 'Strong Winds', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02', direction: 187, max_speed: 2, user_id: 2 },
    {id: 4, is_active: false, type: 'Clear',warning: 'N/A', location: 'CCSFS', category: 'Damaging Winds', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02', direction: 187, max_speed: 2, user_id: 2 },
    {id: 5, is_active: false, type: 'Clear',warning: 'N/A', location: 'Patrick SFB', category: '25 kt observed', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02', direction: 111, max_speed: 15, user_id: 3 },
    {id: 6, is_active: false, type: 'Clear',warning: 'N/A', location: 'Patrick SFB', category: 'Strong Winds', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02', direction: 111, max_speed: 15, user_id: 3 },
    {id: 7, is_active: false, type: 'Clear',warning: 'N/A', location: 'Patrick SFB', category: 'Damaging Winds', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02', direction: 111, max_speed: 15, user_id: 3 },
    {id: 8, is_active: false, type: 'Clear',warning: 'N/A', location: 'KSC', category: '18 kt steady-state', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02', direction: 92, max_speed: 20, user_id: 1 },
    {id: 9, is_active: false, type: 'Clear',warning: 'N/A', location: 'KSC', category: 'Strong Winds', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02', direction: 92, max_speed: 20, user_id: 1 },
    {id: 10, is_active: false, type: 'Clear',warning: 'N/A', location: 'KSC', category: 'Damaging Winds', start: '1900-01-01 00:00:01', end: '1900-01-01 00:00:02', direction: 92, max_speed: 20, user_id: 1 },
  ]);
  await knex.raw('select setval(\'wind_id_seq\', max(id)) from wind')
};
