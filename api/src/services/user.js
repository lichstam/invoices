const userModel = require('../models/user');
const CRUD = require('./CRUD');

const getUser = async (obj) => userModel.findOne({
  email: obj.email,
});

const updateUser = async (userId, data) => userModel.updateOne(
  { _id: userId }, {
    name: data.name,
    street: data.street,
    city: data.city,
    state: data.state,
    country: data.country,
    zipcode: data.zipcode,
    website: data.website,
    number: data.number,
  },
);

module.exports = { ...CRUD(userModel), updateUser, getUser };
