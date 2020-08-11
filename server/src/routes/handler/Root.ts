import { Router } from 'express';
import Route from './Route';
import Snip from '../../models/Snip';

class Root extends Route {
  path: string;

  constructor() {
    super('/');
  }

  run(): Router {
    const router = Router();

    router.get('/*', async (req, res) => {
      if (!req.url.slice(1)) res.boom.notFound();
      const url: any = await Snip.findOne({ id: req.url.slice(1) });
      if (url) {
        res.redirect(301, url.url);
      } else {
        res.redirect(301, 'https://snip.ml');
      }
    });

    router.use('*', (req, res) => {
      res.boom.notFound();
    });

    return router;
  }
}

export default Root;
