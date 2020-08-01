const { Router } = require('express');
const { Base64 } = require('js-base64');
const normalizeURL = require('normalize-url');
const Snip = require('../../models/Snip.js');
const makeid = require('../../utils/makeid.js');
const captcha = require('../../utils/captcha.js');

module.exports.path = '/v1';
module.exports.run = () => {
  const router = Router();

  router.post('/url', async (req, res) => {
    const captchaResponse = await captcha(req.body.token);
    if (!captchaResponse.success || captchaResponse.score < 0.7) return res.boom.forbidden();

    const id = req.body.id ? req.body.id : makeid();
    const url = await Snip.findOne({ id });

    if (url) {
      res.boom.badRequest('id already taken');
    } else {
      try {
        if (!req.body.url) res.boom.badRequest('you must provide a url body parameter');
        if (req.body.url.length > 2000) res.boom.badRequest('url length must be less than 2000');
        if (req.body.url.length < 3) res.boom.badRequest('url length must be greater than 3');

        const url = normalizeURL(req.body.url);

        if (url.includes('https://snip.ml')) res.boom.badRequest('base url cannot be snip.ml');
        const existing = await Snip.findOne({ url: Base64.encode(url) });

        if (existing) {
          res.json({ url: `https://snip.ml/${existing.id}`, id: existing.id });
        } else {
          await Snip.create({ url: Base64.encode(url), id, clicks: 0 });
          res.json({ url: `https://snip.ml/${id}`, id });
        }
      } catch (err) {
        res.boom.badImplementation(err);
      }
    }
  });

  router.get('/url', async (req, res) => {
    const url = await Snip.findOne({ id: req.query.id });

    if (url) {
      res.json(url);
    } else {
      res.boom.badRequest('url not found');
    }
  });

  return router;
};
