const jwt = require('jsonwebtoken');
const config = require('../../config.js');

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (token) {
    token = token.slice(7, token.length);
    token = token.replace(/["']/g, '');
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid',
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied',
    });
  }
};

module.exports = {
  checkToken,
};
