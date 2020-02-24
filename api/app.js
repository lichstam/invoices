const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const prodDb = require('./db');
const { checkToken } = require('./src/auth/check-token');
const { generateToken, sendToken } = require('./src/auth/generate-token');
const dbHandler = require('./tests/db-handler');

const invoice = require('./src/routes/invoice');
const user = require('./src/routes/user');
const client = require('./src/routes/client');
const pdf = require('./src/routes/pdf');
const register = require('./src/routes/register');
const login = require('./src/routes/login');

const app = express();
const port = process.env.PORT || 6200;

const corsConfig = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));
app.use('/invoice', checkToken, invoice);
app.use('/user', checkToken, user);
app.use('/client', checkToken, client);
app.use('/pdf', checkToken, pdf);
app.use('/register', register, generateToken, sendToken);
app.use('/login', login, generateToken, sendToken);

// in dev in-mem database is used
if (process.env.NODE_ENV === 'development') {
  dbHandler.connect();
} else {
  prodDb();
}

app.listen(port, function () {
  console.log(`Listening on ${port}!`);
});

module.exports = app;
