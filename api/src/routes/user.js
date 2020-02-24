const express = require('express');

const userService = require('../services/user');

const router = express.Router();

router.put('/:id', async function (req, res) {
  const result = await userService.update(req.params.id, req.body);
  res.send(result);
});

router.get('/:id', async function (req, res) {
  const invoice = await userService.get(req.params.id);
  res.send(invoice);
});


module.exports = router;
