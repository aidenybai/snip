const { Router } = require('express');
const { Base64 } = require('js-base64');
const Snip = require('../../models/Snip.js');

module.exports = class Root {
  constructor() {
    this.path = '/';
  }

  run() {
    const router = Router();

    router.get('/*', async (req, res) => {
      const url = await Snip.findOne({ id: req.url.slice(1) });
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

    router.use('*', (req, res) => {
      res.boom.notFound();
    });

    return router;
  }
};
