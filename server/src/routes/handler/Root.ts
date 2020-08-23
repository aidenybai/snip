import { Router } from 'express';
import Route from './Route';
import Snip from '../../models/Snip';

class Root extends Route {
  path: string;

  constructor() {
    super('/');
  }

  // eslint-disable-next-line class-methods-use-this
  run(): Router {
    const router = Router();

    // eslint-disable-next-line consistent-return
    router.get('/*', async (req, res) => {
      if (!req.url.slice(1)) return res.boom.notFound();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const url: any = await Snip.findOne({
        id: req.url.slice(1), // gets FOO from snip.ml/FOO
      });

      if (url) {
        res.redirect(301, url.url);
      } else {
        res.redirect(301, 'https://snip.ml');
      }
    });

    return router;
  }
}

export default Root;
