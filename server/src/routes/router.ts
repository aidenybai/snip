import { Express } from 'express';
import Root from './handler/Root';
import API from './handler/API';

const routes = [new API(), new Root()];

export default class {
  static registerRoutes(app: Express) {
    routes.forEach((route) => {
      app.use(route.path, route.run());
    });
  }
}
