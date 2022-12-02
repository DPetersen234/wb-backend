const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || 'development']);


function getAllUserData() {
  return knex('users').select('*')
}

function addNewUser(newUser) {
  return knex('users').insert({ is_admin: newUser.is_admin, user_name: newUser.user_name, passwordHash: newUser.passwordHash, FirstName: newUser.FirstName, LastName: newUser.LastName })
}

function getAllUserDataByUsername(input) {
  return knex('users').select('*').where("user_name", '=', input)
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
  return knex('storm').insert({is_active: req.body.is_active, type: req.body.type, location: req.body.location, wind_speed: req.body.wind_speed, wind_direction: req.body.wind_speed, hail_diameter: req.body.hail_diameter, tornado_category: req.body.tornado_category, start: req.body.start, end: req.body.end, modified: req.body.modified, user_id:req.body.user_id})
}

function deleteStorm(req) {
  return knex('storm')
  .select('*')
  .where({id: req.body.id})
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

function createWind(req) {
  return knex('wind').insert({is_active: req.body.is_active, type: req.body.type, location: req.body.location, category: req.body.category, max_speed: req.body.max_speed, direction: req.body.direction, start: req.body.start, end: req.body.end, modified: req.body.modified, user_id:req.body.user_id})
}

function deleteWind(req) {
  return knex('wind')
  .select('*')
  .where({id: req.body.id})
  .delete()
  .from('wind')
}

function getLightningData() {
  return knex('lightning').select('*')
}


function updateLightningData(input) {
  return knex('lightning')
    .where({ location: input.location })
    .update({ ...input})
    .select('*')
    .from('lightning')
}

function createLightning(input) {
  return knex('lightning').insert({is_active: input.is_active, type: input.type, location: input.location, category: input.category, start: input.start, end: input.end, user_id: input.user_id})
}
function deleteLightning(req) {
  return knex('lightning')
  .select('*')
  .where({id: req.body.id})
  .delete()
  .from('lightning')
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
  getAllUserDataByUsername
};