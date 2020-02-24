const clientModel = require('../models/client');
const CRUD = require('./CRUD');

module.exports = CRUD(clientModel);
