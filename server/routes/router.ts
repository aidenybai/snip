import Root from './handlers/root';
import API from './handlers/api';

const routes = [new API(), new Root()];

export default class {
  static registerRoutes(app) {
    routes.forEach((route) => {
      app.use(route.path, route.run());
    });
  }
}
