const { expect } = require('chai');
const { assert, match } = require('sinon');
const { Given, When, Then } = require('cucumber');
const invoiceService = require('../../../src/services/invoice');

const createdInvoices = [];

const getSantiziedItems = (items) => items.map(({
  name,
  description,
  price,
  rate,
  amount,
}) => ({
  name,
  description,
  price,
  rate,
  amount,
}));

Given('I create {int} of the following invoices', async function (amountToBeCreated, table) {
  const { rawTable } = table;
  const totalInvoices = Array(amountToBeCreated).fill(0).map(() => [...rawTable]);
  const invoiceData = totalInvoices
    .map((invoice) => invoice.reduce((obj, item) => ({ ...obj, [item[0]]: item[1] }), {}));
  const invoices = await Promise
    .all(invoiceData.map(async (invoice) => invoiceService.create(invoice)));
  invoices.map(({
    _id, clientId, currency, taxInPercent,
  }) => createdInvoices.unshift({
    _id,
    clientId,
    currency,
    taxInPercent,
  }));
  this.lastId = invoices[invoices.length - 1];
});

Then('I retrieve that invoice', async function () {
  const [lastInvoice] = createdInvoices;
  const {
    _id,
    clientId,
    currency,
    taxInPercent,
  } = await invoiceService.get(lastInvoice._id);
  expect({
    _id,
    clientId,
    currency,
    taxInPercent,
  }).to.deep.equal(lastInvoice);
});

When('I add the following items to the newly created invoice with term {string}', async function (terms, table) {
  const { rawTable } = table;
  const [lastInvoice] = createdInvoices;
  const items = rawTable.reduce((nextItems, item) => [...nextItems, {
    name: item[0],
    description: item[1],
    price: Number(item[2]),
    rate: Number(item[3]),
    amount: Number(item[4]),
  }], []);
  const { ok } = await invoiceService.addRevision(lastInvoice._id, { items, terms });
  this.lastAddedItems = items;
  expect(ok).to.equal(1);
});

Then('I retrieve that invoice that contains a new revision with these new items', async function () {
  const { revisions } = await invoiceService.get(this.lastId);
  const [lastRevision] = revisions;
  const { items } = lastRevision;
  this.lastRevisions = revisions;
  expect(getSantiziedItems(items)).to.deep.equal(this.lastAddedItems);
});

Then('a new revision is created', async function () {
  const { revisions } = await invoiceService.get(this.lastId);
  const { items } = revisions[revisions.length - 1];
  this.lastRevisions = revisions;
  expect(getSantiziedItems(items)).to.deep.equal(this.lastAddedItems);
});

Then('the total amount of revisions is {int}', function (amount) {
  expect(this.lastRevisions).to.length(amount);
});

Then('they all contain datestamps', function () {
  return this.lastRevisions.every(({ date }) => new Date(date).getTime() > 0);
});

Then('I retrieve all invoices', async function () {
  const invoices = await invoiceService.getAll();
  this.lastInvoices = invoices;
});

Then('the total amount is {int}', function (amount) {
  expect(this.lastInvoices).to.length(amount);
});

When('I change the settings to following', async function (table) {
  const { rawTable } = table;
  const invoiceData = rawTable.reduce((obj, item) => ({ ...obj, [item[0]]: item[1] }), {});
  const { ok } = await invoiceService.update(this.lastId, invoiceData);
  this.lastModifiedSettings = invoiceData;
  expect(ok).to.equal(1);
});

Then('I retrieve the invoice with the new settings', async function () {
  const {
    clientId,
    userId,
    taxInPercent,
    currency,
  } = await invoiceService.get(this.lastId);
  expect({
    clientId, userId, taxInPercent: String(taxInPercent), currency,
  }).to.deep.equal(this.lastModifiedSettings);
});


When('I delete the last created invoice', async function () {
  await invoiceService.del(this.lastId);
});

Then('I retrieve {int} invoice', async function (nbr) {
  const allInvoice = await invoiceService.getAll();
  expect(allInvoice).to.be.lengthOf(nbr);
});
