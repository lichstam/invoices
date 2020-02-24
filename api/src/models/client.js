const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String },
  street: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zipcode: { type: String },
});

module.exports = mongoose.model('client', clientSchema);
