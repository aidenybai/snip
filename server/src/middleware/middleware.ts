import { Express } from 'express';
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
  static registerMiddleware(app: Express): void {
    app.enable('trust proxy');
    app.disable('view cache');

    app.use(
      '/api/v1',
      // 20 requests per 10 seconds
      ratelimit({
        windowMs: 10 * 1000,
        max: 20,
      }),
    );

    coreMiddlewares.forEach((middleware) => {
      app.use(middleware);
    });
  }
}

export default Middleware;
