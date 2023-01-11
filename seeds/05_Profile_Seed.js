/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('profiles').del()
  await knex('profiles').insert([
    {
      id: 1,
      user_id: 1,
      capeLightning: ['Port'],
      kscLightning: [],
      otherLightning: [],
      CCSFSLightningToggle: true,
      KSCLightningToggle: false,
      OtherLightningToggle: false,
      psfbLightningToggle: false,
      capeWind: true,
      kscWind: false, 
      psfbWind: false,
      capeStorm: true,
      kscStorm: false,
      psfbStorm: false,
      windSplash: true,
      stormSplash: true,
      mode: 'dark',
      accessibility:'default'
    },

  ]);
  await knex.raw('select setval(\'profiles_id_seq\', max(id)) from profiles')
};
