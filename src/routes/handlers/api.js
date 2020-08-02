const { Router } = require('express');
const { Base64 } = require('js-base64');
const normalizeURL = require('normalize-url');
const Snip = require('../../models/Snip.js');
const makeid = require('../../utils/makeid.js');
const captcha = require('../../utils/captcha.js');
const validateURL = require('../../utils/validateURL.js');

module.exports.path = '/v1';
module.exports.run = () => {
  const router = Router();

  router.post('/url', async (req, res) => {
    const captchaResponse = await captcha(req.body.token);
    if (!captchaResponse.success)
      return res.boom.forbidden(
        `Your bot score (${captchaResponse.score || null}) is less than 0.5`
      );
    if (captchaResponse.score < 0.5) return res.boom.forbidden(`Token failure (refresh page)`);

    const id = req.body.id ? req.body.id : makeid();
    const url = await Snip.findOne({ id });

    if (url) {
      res.boom.badRequest('ID already taken');
    } else {
      try {
        const url = normalizeURL(req.body.url);
        const validate = await validateURL(url);

        if (validate.error) return res.boom.badRequest(validate.message);
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
