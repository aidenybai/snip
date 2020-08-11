import { Express } from 'express';
import Root from './handlers/Root';
import API from './handlers/API';

const routes = [new API(), new Root()];

export default class {
  static registerRoutes(app: Express) {
    routes.forEach((route) => {
      app.use(route.path, route.run());
    });
  }
}
