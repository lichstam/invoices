const express = require('express');
const generateInvoice = require('../pdf-generators/invoice');

const router = express.Router();

router.post('/', (req, res) => {
  res.setHeader('Content-type', 'blob');
  const doc = generateInvoice(req.body);
  doc.pipe(res);
  doc.end();
});

module.exports = router;
