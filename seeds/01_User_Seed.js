/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, is_admin: true, user_name: 'claude@gmail.com', passwordHash: 'beholdthegold1', FirstName: 'Calude', LastName: 'Summers'},
    {id: 2, is_admin: true, user_name: 'tory@gmail.com', passwordHash: 'beholdthegold2', FirstName: 'Tory', LastName: 'Robinson'},
    {id: 3, is_admin: false, user_name: 'spencer@gmail.com', passwordHash: 'beholdthegold3', FirstName: 'Calude', LastName: 'Summers'},
    {id: 4, is_admin: false, user_name: 'alex@gmail.com', passwordHash: 'beholdthegold4',  FirstName: 'Calude', LastName: 'Summers'},
    {id: 5, is_admin: false, user_name: 'dana@gmail.com', passwordHash: 'beholdthegold5',  FirstName: 'Calude', LastName: 'Summers'}
  ]);
  await knex.raw('select setval(\'users_id_seq\', max(id)) from users')
};
