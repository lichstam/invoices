const jwt = require('jsonwebtoken');
const config = require('../../config.js');

const createToken = (email) => jwt.sign({
  id: email,
}, config.secret,
{
  expiresIn: 60 * 120,
});

const generateToken = (req, res, next) => {
  req.token = createToken(req.body.email);
  return next();
};

const sendToken = (req, res) => {
  res.setHeader('x-auth-token', req.token);
  return res.status(200).send(JSON.stringify(req.body.email));
};

module.exports = { generateToken, sendToken };
