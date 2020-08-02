const bodyParser = require('body-parser');
const boom = require('express-boom');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const token = require('express-bearer-token');
const ratelimit = require('express-rate-limit');
const helmet = require('helmet');
const express = require('express');
const { join } = require('path');

const coreMiddlewares = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  boom(),
  cors({ origin: '*' }),
  compression(),
  morgan('dev'),
  token(),
  helmet(),
  express.static(join(__dirname, './../public')),
];

module.exports = class {
  static registerCoreMiddlewares(app) {
    app.enable('trust proxy', true);
    app.disable('view cache');

    app.use(
      '/api/v1',
      ratelimit({
        windowMs: 10000,
        max: 50,
      })
    );

    coreMiddlewares.forEach((middleware) => {
      app.use(middleware);
    });
  }
};
