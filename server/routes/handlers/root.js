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
      res.redirect(301, url ? Base64.decode(url.url) : 'https://snip.ml');
    });

    router.use('*', (req, res) => {
      res.boom.notFound();
    });

    return router;
  }
};
