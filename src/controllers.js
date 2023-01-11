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
      capeLightning: ["Cape Central", "CX-20/16/LZ", "CX-36/46", "CX-37/ASOC/PPF", "CX-40/41/SPOC", "Port"],
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
  updateProfileByUserId
};