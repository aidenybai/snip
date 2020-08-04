import { Router } from 'express';
import { Base64 } from 'js-base64';
import Snip from '../../models/Snip';

export default class {
  path: string;

  constructor() {
    this.path = '/';
  }

  run() {
    const router = Router();

    router.get('/*', async (req, res) => {
      const url: any = await Snip.findOne({ id: req.url.slice(1) });
      if (url) {
        await Snip.findOneAndUpdate(
          { id: req.url.slice(1) },
          {
            expireAt: new Date(Date.now() + 604800000).toISOString(),
          }
        );
        res.redirect(301, Base64.decode(url.url));
      } else {
        res.redirect(301, 'https://snip.ml');
      }
    });

    router.use('*', (req, { boom }) => {
      boom.notFound();
    });

    return router;
  }
}
