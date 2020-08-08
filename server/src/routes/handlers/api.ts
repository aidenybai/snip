import { Router } from 'express';
import normalizeURL from 'normalize-url';
import Snip from '../../models/Snip';
import makeid from '../../utils/makeid';
import captcha from '../../utils/captcha';
import validateURL from '../../utils/validateURL';

export default class {
  path: string;

  constructor() {
    this.path = '/v1';
  }

  run() {
    const router = Router();

    router.post('/url', async ({ body }, res) => {
      const captchaResponse = await captcha(body.token);
      if (!captchaResponse.success) return res.boom.forbidden(`Token failure (refresh page)`);
      if (captchaResponse.score < 0.5) {
        return res.boom.forbidden(
          `Your bot score (${captchaResponse.score || null}) is less than 0.5`
        );
      }

      const id = body.id ? body.id : makeid();
      const url = await Snip.findOne({ id });

      if (url) {
        res.boom.badRequest('ID already taken');
      } else {
        try {
          const url = normalizeURL(body.url);
          const validate = await validateURL(url);

          if (validate.error) return res.boom.badRequest(validate.message);
          const existing = await Snip.findOne({ url });

          if (existing) {
            res.json({ url: `https://snip.ml/${existing.id}`, id: existing.id });
          } else {
            await Snip.create({ url, id });
            res.json({ url: `https://snip.ml/${id}`, id });
          }
        } catch (err) {
          res.boom.badImplementation(err);
        }
      }
    });

    router.get('/url', async ({ query }, res) => {
      const url = await Snip.findOne({ id: query.id });

      if (url) {
        res.json(url);
      } else {
        res.boom.badRequest('url not found');
      }
    });

    router.get('/ping', async (req, res) => {
      res.send('OK');
    });

    return router;
  }
}
