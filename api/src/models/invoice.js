const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  clientId: { type: String },
  userId: { type: String },
  taxInPercent: { type: Number },
  currency: { type: String },
  revisions: [{
    terms: { type: String, required: false },
    date: { type: Date, default: Date.now },
    items: [{
      name: { type: String, required: true },
      description: { type: String, required: false },
      price: { type: Number, required: true },
      rate: { type: Number, required: true },
      amount: { type: Number, required: true },
    }],
  }],
});

module.exports = mongoose.model('invoice', invoiceSchema);
