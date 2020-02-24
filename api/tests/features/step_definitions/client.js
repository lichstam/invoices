const { expect } = require('chai');
const { Given, When, Then } = require('cucumber');
const clientService = require('../../../src/services/client');

const getSantiziedItems = ({
  name,
  street,
  city,
  state,
  country,
  zipcode,
}) => ({
  name, street, city, state, country, zipcode,
});

const getClientData = (rawTable) => rawTable.reduce((obj, item) => (obj = { ...obj, [item[0]]: item[1] }, obj), {}); // eslint-disable-line

Given('I create a client with the following information', async function (table) {
  const { rawTable } = table;
  const clientData = getClientData(rawTable);
  const client = await clientService.create(clientData);
  this.lastId = client._id;
  this.lastCreatedClient = getSantiziedItems(client);
  expect(this.lastCreatedClient).to.deep.equal(clientData);
});

When('I retrieve the client', async function () {
  this.lastRetrievedClient = await clientService.get(this.lastId);
});

Then('I receive that client', function () {
  expect(getSantiziedItems(this.lastRetrievedClient)).to.deep.equal(this.lastCreatedClient);
});


Then('I update the client with the following information', async function (table) {
  const { rawTable } = table;
  const clientData = getClientData(rawTable);
  const { ok } = await clientService.update(this.lastId, clientData);
  this.lastUpdatedClient = clientData;
  expect(ok).to.equal(1);
});

Then('I retrieve the client containing the new updates', async function () {
  const clientWithUpdates = await clientService.get(this.lastId);
  expect(getSantiziedItems(clientWithUpdates)).to.deep.equal(this.lastUpdatedClient);
});

When('I delete the last created client', async function () {
  await clientService.del(this.lastId);
});

Then('I retrieve {int} clients', async function (nbr) {
  const allClients = await clientService.getAll();
  expect(allClients).to.be.lengthOf(nbr);
});
