const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router.js');
const middleware = require('./middleware/middleware.js');
const config = require('./config/production.js');

mongoose.connect(config.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express();

middleware.registerCoreMiddlewares(app);
router.registerRoutes(app);

app.listen(config.PORT, (err) => {
  if (err) return console.error(err);
  return console.log(`Launched app on port ${config.PORT}`);
});
