const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: { type: String, required: true },
  name: { type: String },
  street: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zipcode: { type: String },
  website: { type: String },
  number: { type: String },
});

module.exports = mongoose.model('user', userSchema);
