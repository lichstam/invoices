const express = require('express');
const bcrypt = require('bcrypt');

const userService = require('../services/user');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  if (email && password) {
    const user = await userService.getUser(req.body);
    if (user) {
      const { password: hash } = user;
      bcrypt.compare(password, hash, async function (err, res) {
        next();
      });
    } else {
      res.status(404).json('Wrong password/Invalid user');
    }
  }
});

module.exports = router;
