const mongoose = require('mongoose');

const prodDb = async () => {
  try {
    await mongoose.connect('mongodb://mongodb');
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB error: ', err.stack);
    process.exit(1);
  }
};

module.exports = prodDb;
