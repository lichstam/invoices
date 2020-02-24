const express = require('express');
const bcrypt = require('bcrypt');

const userService = require('../services/user');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  if (email && password) {
    const user = await userService.getUser(req.body);
    if (!user) {
      bcrypt.hash(password, 10, async function (err, hash) {
        await userService.create(({ email, password: hash }));
        next();
      });
    } else {
      res.status(404).json('User already exists!');
    }
  }
});

module.exports = router;
