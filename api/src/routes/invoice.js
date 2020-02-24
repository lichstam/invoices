const express = require('express');
const invoiceService = require('../services/invoice');

const router = express.Router();

router.post('/', async function (req, res) {
  try {
    const invoice = await invoiceService.create(req.body);
    res.send(invoice);
  } catch (err) {
    res.send(err);
  }
});

router.get('/:id', async function (req, res) {
  const invoice = await invoiceService.get(req.params.id);
  res.send(invoice);
});

router.get('/', async function (req, res) {
  const invoices = await invoiceService.getAll();
  res.send(invoices);
});

router.put('/:id', async function (req, res) {
  const { settings, revision } = req.body;
  if (revision) await invoiceService.addRevision(req.params.id, revision);
  const invoices = await invoiceService.update(req.params.id, settings);
  res.send(invoices);
});


module.exports = router;
