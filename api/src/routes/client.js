const express = require('express');
const clientService = require('../services/client');

const router = express.Router();

router.post('/', async function (req, res) {
  try {
    const invoice = await clientService.create(req.body);
    res.send(invoice);
  } catch (err) {
    res.send(err);
  }
});

router.get('/:id', async function (req, res) {
  const invoice = await clientService.get(req.params.id);
  res.send(invoice);
});

router.get('/', async function (req, res) {
  const client = await clientService.getAll();
  res.send(client);
});

router.put('/:id', async function (req, res) {
  const result = await clientService.update(req.params.id, req.body);
  res.send(result);
});

router.delete('/:id', async function (req, res) {
  const result = await clientService.del(req.params.id);
  res.send(result);
});

module.exports = router;
