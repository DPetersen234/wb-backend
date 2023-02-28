const { useResolvedPath } = require('react-router-dom');

const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || 'development']);


function getAllUserData() {
  return knex('users').select('*')
}
function addNewProfile (newUser) {
  let id = knex('users').select('id').from('users').where('user_name', '=', newUser.user_name)
  return knex('profiles')
    .insert({
      user_id: id,
      capeLightning: ["Cape Central", "CX-20-16-LZ", "CX-36-46", "CX-37-ASOC-PPF", "CX-40-41-SPOC", "Port"],
      kscLightning: ["KSC Industrial", "LC-39", "SLF"],
      otherLightning: ["Astrotech", "CIDCO Park"],
      CCSFSLightningToggle: true,
      KSCLightningToggle: true,
      OtherLightningToggle: true,
      psfbLightningToggle: true,
      capeWind: true,
      kscWind: true,
      psfbWind: true,
      capeStorm: true,
      kscStorm: true,
      psfbStorm: true,
      windSplash: true,
      stormSplash: true,
      mode: 'light',
      accessibility: 'default'
    })
}
function addNewUser(newUser) {
   return (knex('users')
    .insert({
      is_admin: newUser.is_admin,
      user_name: newUser.user_name,
      passwordHash: newUser.passwordHash,
      FirstName: newUser.FirstName,
      LastName: newUser.LastName
    })
    )
}

function getAllUserDataByUsername(input) {
  return knex('users').where('user_name', '=', input)
  .join('profiles', {'user_id ': 'users.id'})
  .select('*')
}

function getAllUserDataByUser(id) {
  return knex('users')
    .select('*').where('id', '=', id)
}

function updateUserInfo(id, req) {
  return knex('users')
    .where({ id: id })
    .update({ ...req.body })
    .select('*')
    .from('users')
}

function deleteUser(id, req) {
  return knex('users')
    .select('*')
    .where({ id: id })
    .delete()
    .from('users')
}

function getStormData() {
  return knex('storm').select('*')
}

function updateStormData(req) {
  return knex('storm')
    .where({ location: req.location })
    .update({ ...req })
    .select('*')
    .from('storm')
}

function createStorm(req) {
  return knex('storm').insert({ is_active: req.body.is_active, type: req.body.type, location: req.body.location, wind_speed: req.body.wind_speed, wind_direction: req.body.wind_speed, hail_diameter: req.body.hail_diameter, tornado_category: req.body.tornado_category, start: req.body.start, end: req.body.end, modified: req.body.modified, user_id: req.body.user_id })
}

function deleteStorm(req) {
  return knex('storm')
    .select('*')
    .where({ id: req.body.id })
    .delete()
    .from('storm')
}

function getWindData() {
  return knex('wind').select('*')
}

function updateWindData(req) {
  return knex('wind')
    .where({ id: req.id })
    .update({ ...req })
    .select('*')
    .from('wind')
}

function updateProfileData(req) {
  return knex('profiles')
    .where("user_id", req.user_id)
    .update({ ...req })
    .select('*')
    .from('profiles')
}
function updateProfileByUserId(input,req) {
  return knex('profiles')
  .where({user_id:req.id})
  .update({...req})
  .select('*')
  .from('profiles')
}

function createProfileData(req) {
  return knex('profiles')
    .insert({
      id: req.body.id,
      user_id: req.body.user_id,
      capeLightning: req.body.capeLightning,
      kscLightning: req.body.kscLightning,
      psfbLightning: req.body.psfbLightning,
      capeWind: req.body.capeWind,
      kscWind: req.body.kscWind,
      psfbWind: req.body.psfbWind,
      capeStorm: req.body.capeStorm,
      kscStorm: req.body.kscStorm,
      psfbStorm: req.body.psfbStorm,
      mode: req.body.mode,
      accessibility: req.body.accessibility
    })
}

function createWind(req) {
  return knex('wind').insert({ is_active: req.body.is_active, type: req.body.type, location: req.body.location, category: req.body.category, max_speed: req.body.max_speed, direction: req.body.direction, start: req.body.start, end: req.body.end, modified: req.body.modified, user_id: req.body.user_id })
}

function deleteWind(req) {
  return knex('wind')
    .select('*')
    .where({ id: req.body.id })
    .delete()
    .from('wind')
}

function getLightningData() {
  return knex('lightning').select('*')
}


function updateLightningData(input) {
  return knex('lightning')
    .where({ location: input.location })
    .update({ ...input })
    .select('*')
    .from('lightning')
}

function createLightning(input) {
  return knex('lightning').insert({ is_active: input.is_active, type: input.type, location: input.location, category: input.category, start: input.start, end: input.end, user_id: input.user_id })
}
function deleteLightning(req) {
  return knex('lightning')
    .select('*')
    .where({ id: req.body.id })
    .delete()
    .from('lightning')
}

function getProfileData() {
  return knex('profiles')
    .select('*')
}

function getProfileDataByUserId(id, req) {

  return knex('profiles')
    .select('*')
    .where({ user_id: id })
}


function getEventLogData() {
  return knex('tasks').select('tasks.id', 'tasks.complete', 'tasks.name', 'tasks.description', 'tasks.id_users', 'tasks.id_locations', 'users.email', 'users.password', 'locations.loc_code', 'locations.building_number', 'locations.lat', 'locations.long').where('tasks.id', '=', id)
    .join('users', function () {
      this
        .on('users.id', '=', 'id_users')
    })
    .join('locations', function () {
      this
        .on('locations.id', '=', 'id_locations')
    })
}

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

function getLightStatus() {
  let lightning = knex('lightning').select('*')
  let lightData 
  let windData 
  let dataString = '0000000000000000$0000000000000000#00000%000000&00000'

  return lightning.then(data =>{
    lightData = data
    return knex('wind').select('*')
  }).then(data => {
    windData = data
  }).then(()=>{
    lightData.map((item) => {
      if (item.type === 'Phase 1' && item.location === 'LC-39') {
        dataString = setCharAt(dataString, 3, '1')
        console.log('string', dataString)
      } else if (item.type === 'Phase 2' && item.location === 'LC-39') {
        dataString = setCharAt(dataString, 3, '1')
        dataString = setCharAt(dataString, 20, '1')
      } else if (item.type === 'Clear' && item.location === 'LC-39') {
        dataString = setCharAt(dataString, 3, '0')
        dataString = setCharAt(dataString, 20, '0')
      }
      if (item.type === 'Phase 1' && item.location === 'Cape Central') {
        dataString = setCharAt(dataString, 6, '1')
        console.log('string', dataString)
      } else if (item.type === 'Phase 2' && item.location === 'Cape Central') {
        dataString = setCharAt(dataString, 6, '1')
        dataString = setCharAt(dataString, 23, '1')
      } else if (item.type === 'Clear' && item.location === 'Cape Central') {
        dataString = setCharAt(dataString, 6, '0')
        dataString = setCharAt(dataString, 23, '0')
      }
      if (item.type === 'Phase 1' && item.location === 'CX-20-16-LZ') {
        dataString = setCharAt(dataString, 12, '1')
        console.log('string', dataString)
      } else if (item.type === 'Phase 2' && item.location === 'CX-20-16-LZ') {
        dataString = setCharAt(dataString, 12, '1')
        dataString = setCharAt(dataString, 29, '1')
      } else if (item.type === 'Clear' && item.location === 'CX-20-16-LZ') {
        dataString = setCharAt(dataString, 12, '0')
        dataString = setCharAt(dataString, 29, '0')
      }
      if (item.type === 'Phase 1' && item.location === 'CX-37-ASOC-PPF') {
        dataString = setCharAt(dataString, 5, '1')
        console.log('string', dataString)
      } else if (item.type === 'Phase 2' && item.location === 'CX-37-ASOC-PPF') {
        dataString = setCharAt(dataString, 5, '1')
        dataString = setCharAt(dataString, 22, '1')
      } else if (item.type === 'Clear' && item.location === 'CX-37-ASOC-PPF') {
        dataString = setCharAt(dataString, 5, '0')
        dataString = setCharAt(dataString, 22, '0')
      }
      if (item.type === 'Phase 1' && item.location === 'Port') {
        dataString = setCharAt(dataString, 7, '1')
        console.log('string', dataString)
      } else if (item.type === 'Phase 2' && item.location === 'Port') {
        dataString = setCharAt(dataString, 7, '1')
        dataString = setCharAt(dataString, 24, '1')
      } else if (item.type === 'Clear' && item.location === 'Port') {
        dataString = setCharAt(dataString, 7, '0')
        dataString = setCharAt(dataString, 24, '0')
      }
      if (item.type === 'Phase 1' && item.location === 'CX-36-46') {
        dataString = setCharAt(dataString, 10, '1')
        console.log('string', dataString)
      } else if (item.type === 'Phase 2' && item.location === 'CX-36-46') {
        dataString = setCharAt(dataString, 10, '1')
        dataString = setCharAt(dataString, 27, '1')
      } else if (item.type === 'Clear' && item.location === 'CX-36-46') {
        dataString = setCharAt(dataString, 10, '0')
        dataString = setCharAt(dataString, 27, '0')
      }
      if (item.type === 'Phase 1' && item.location === 'CX-40-41-SPOC') {
        dataString = setCharAt(dataString, 4, '1')
        console.log('string', dataString)
      } else if (item.type === 'Phase 2' && item.location === 'CX-40-41-SPOC') {
        dataString = setCharAt(dataString, 4, '1')
        dataString = setCharAt(dataString, 21, '1')
      } else if (item.type === 'Clear' && item.location === 'CX-40-41-SPOC') {
        dataString = setCharAt(dataString, 4, '0')
        dataString = setCharAt(dataString, 21, '0')
      }
      if (item.type === 'Phase 1' && item.location === 'SLF') {
        dataString = setCharAt(dataString, 1, '1')
        console.log('string', dataString)
      } else if (item.type === 'Phase 2' && item.location === 'SLF') {
        dataString = setCharAt(dataString, 1, '1')
        dataString = setCharAt(dataString, 18, '1')
      } else if (item.type === 'Clear' && item.location === 'SLF') {
        dataString = setCharAt(dataString, 1, '0')
        dataString = setCharAt(dataString, 18, '0')
      }
      if (item.type === 'Phase 1' && item.location === 'KSC Industrial') {
        dataString = setCharAt(dataString, 2, '1')
        console.log('string', dataString)
      } else if (item.type === 'Phase 2' && item.location === 'KSC Industrial') {
        dataString = setCharAt(dataString, 2, '1')
        dataString = setCharAt(dataString, 19, '1')
      } else if (item.type === 'Clear' && item.location === 'KSC Industrial') {
        dataString = setCharAt(dataString, 2, '0')
        dataString = setCharAt(dataString, 19, '0')
      }
      if (item.type === 'Phase 1' && item.location === 'CIDCO Park') {
        dataString = setCharAt(dataString, 11, '1')
        console.log('string', dataString)
      } else if (item.type === 'Phase 2' && item.location === 'CIDCO Park') {
        dataString = setCharAt(dataString, 11, '1')
        dataString = setCharAt(dataString, 28, '1')
      } else if (item.type === 'Clear' && item.location === 'CIDCO Park') {
        dataString = setCharAt(dataString, 11, '0')
        dataString = setCharAt(dataString, 28, '0')
      }
      if (item.type === 'Phase 1' && item.location === 'Astrotech') {
        dataString = setCharAt(dataString, 9, '1')
        console.log('string', dataString)
      } else if (item.type === 'Phase 2' && item.location === 'Astrotech') {
        dataString = setCharAt(dataString, 9, '1')
        dataString = setCharAt(dataString, 26, '1')
      } else if (item.type === 'Clear' && item.location === 'Astrotech') {
        dataString = setCharAt(dataString, 9, '0')
        dataString = setCharAt(dataString, 26, '0')
      }
      if (item.type === 'Phase 1' && item.location === 'Patrick SFB') {
        dataString = setCharAt(dataString, 8, '1')
        console.log('string', dataString)
      } else if (item.type === 'Phase 2' && item.location === 'Patrick SFB') {
        dataString = setCharAt(dataString, 8, '1')
        dataString = setCharAt(dataString, 25, '1')
      } else if (item.type === 'Clear' && item.location === 'Patrick SFB') {
        dataString = setCharAt(dataString, 8, '0')
        dataString = setCharAt(dataString, 25, '0')
      }
  })

      windData.map((item) => {
        if (item.category === '18 kt steady-state' && item.type === 'Advisory') {
          dataString = setCharAt(dataString, (item.location === 'KSC' ? 34 : 40), '1')
          console.log('dataString1', dataString)
      }
      else if (item.category === '22 kt steady-state' && item.type === 'Advisory') {
          dataString = setCharAt(dataString, 41, '1')
          console.log('dataString2', dataString)
      }
      else if (item.category === '25 kt observed' && item.type === 'Advisory') {
          dataString = setCharAt(dataString, 47, '1')
          console.log('dataString3', dataString)
      }
      else if (item.category === 'Strong Winds' && item.type === 'Warning') {
          dataString = setCharAt(dataString, (item.location === 'KSC' ? 35 : item.location === 'CCSFS' ? 42 : 48), '1')
          console.log('dataString4', dataString)
      }
      else if (item.category === 'Damaging Winds' && item.type === 'Warning') {
          dataString = setCharAt(dataString, (item.location === 'KSC' ? 36 : item.location === 'CCSFS' ? 43 : 49), '1')
          console.log('dataString5', dataString)
      }
      else if (item.category === '18 kt steady-state' && item.type === 'Clear') {
          dataString = setCharAt(dataString, (item.location === 'KSC' ? 34 : 40), '0')
          console.log('dataString6', dataString)
      }
      else if (item.category === '22 kt steady-state' && item.type === 'Clear') {
          dataString = setCharAt(dataString, 41, '0')
          console.log('dataString7', dataString)
      }
      else if (item.category === '25 kt observed' && item.type === 'Clear') {
          dataString = setCharAt(dataString, 47, '0')
          console.log('dataString3', dataString)
      }
      else if (item.category === 'Strong Winds' && item.type === 'Clear') {
          dataString = setCharAt(dataString, (item.location === 'KSC' ? 35 : item.location === 'CCSFS' ? 42 : 48), '0')
          console.log('dataString8', dataString)
      }
     else if (item.category === 'Damaging Winds' && item.type === 'Clear') {
          dataString = setCharAt(dataString, (item.location === 'KSC' ? 36 : item.location === 'CCSFS' ? 43 : 49), '0')
          console.log('dataString9', dataString)
      }
    })
    return dataString
  })
}

module.exports = {
  getLightningData,
  getStormData, getWindData,
  getAllUserData,
  getAllUserDataByUser,
  addNewUser,
  updateUserInfo,
  deleteUser,
  updateStormData,
  updateWindData,
  createWind,
  updateLightningData,
  createStorm,
  createLightning,
  deleteStorm,
  deleteLightning,
  deleteWind,
  getAllUserDataByUsername,
  getProfileData,
  updateProfileData,
  createProfileData,
  addNewProfile,
  getProfileDataByUserId,
  updateProfileByUserId,
  getLightStatus
};