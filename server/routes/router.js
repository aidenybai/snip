const Root = require('./handlers/root.js');
const API = require('./handlers/api.js');

const routes = [new API(), new Root()];

module.exports = class {
  static registerRoutes(app) {
    routes.forEach((route) => {
      app.use(route.path, route.run());
    });
  }
};
