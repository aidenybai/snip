import { Router } from 'express';
import Route from './Route';
import Snip from '../../models/Snip';

class Root extends Route {
  path: string;

  router: Router;

  constructor() {
    super('/');
    this.router = Router();
  }

  run(): Router {
    this.router.get('/*', async (req, res) => {
      if (!req.url.slice(1)) res.boom.notFound();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const url: any = await Snip.findOne({ id: req.url.slice(1) });
      if (url) {
        res.redirect(301, url.url);
      } else {
        res.redirect(301, 'https://snip.ml');
      }
    });

    this.router.use('*', (req, res) => {
      res.boom.notFound();
    });

    return this.router;
  }
}

export default Root;
