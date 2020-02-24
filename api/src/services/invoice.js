const invoiceModel = require('../models/invoice');
const CRUD = require('./CRUD');

const addRevision = async (invoiceId, revision) => invoiceModel.updateOne(
  { _id: invoiceId },
  { $push: { revisions: revision } },
);

module.exports = {
  addRevision,
  ...CRUD(invoiceModel),
};
