import bodyParser from 'body-parser';
import boom from 'express-boom';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import ratelimit from 'express-rate-limit';
import helmet from 'helmet';

const coreMiddlewares = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  boom(),
  cors({ origin: '*' }),
  compression(),
  morgan('dev'),
  helmet(),
];

class Middleware {
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
}

export default Middleware;
