const root = require('./handlers/root.js');
const api = require('./handlers/api.js');

const routes = [api, root];

module.exports = class {
  static registerRoutes(app) {
    routes.forEach((route) => {
      app.use(route.path, route.run());
    });
  }
};
