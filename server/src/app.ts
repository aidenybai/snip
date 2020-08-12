import express from 'express';
import mongoose from 'mongoose';
import router from './routes/router';
import middleware from './middleware/middleware';
import config from './config/production';

mongoose.connect(config.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const app = express();

middleware.registerCoreMiddlewares(app);
router.registerRoutes(app);

app.listen(config.PORT, (err) => {
  if (err) throw new Error(err);
  // eslint-disable-next-line no-console
  return console.log(`Running on ${config.PORT}`);
});
