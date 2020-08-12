import { Router } from 'express';
import normalizeURL from 'normalize-url';
import Route from './Route';
import Snip from '../../models/Snip';
import Hash from '../../utils/Hash';
import ReCaptcha from '../../utils/ReCaptcha';
import Validate from '../../utils/Validate';

class API extends Route {
  path: string;

  hash: Hash;

  captcha: ReCaptcha;

  validate: Validate;

  constructor() {
    super('/v1');
    this.hash = new Hash();
    this.captcha = new ReCaptcha();
    this.validate = new Validate();
  }

  run(): Router {
    const router = Router();

    // eslint-disable-next-line consistent-return
    router.post('/url', async (req, res): Promise<unknown> => {
      const captchaResponse = await this.captcha.data(req.body.token);
      if (!captchaResponse.success) return res.boom.forbidden('Token failure (refresh page)');
      if (captchaResponse.score < 0.5) {
        return res.boom.forbidden(
          `Your bot score (${captchaResponse.score || null}) is less than 0.5`,
        );
      }

      const id = req.body.id ? req.body.id : this.hash.generate();
      const url = await Snip.findOne({ id });

      if (url) {
        res.boom.badRequest('ID already taken');
      } else {
        try {
          const normalizedURL = normalizeURL(req.body.url);
          const validate = await this.validate.url(normalizedURL);

          if (validate.error) return res.boom.badRequest(validate.message);
          const existing = await Snip.findOne({ url: normalizedURL });

          if (existing) {
            res.json({ url: `https://snip.ml/${existing.id}`, id: existing.id });
          } else {
            await Snip.create({ url: normalizedURL, id });
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

    router.get('/ping', async (req, res) => {
      res.send('OK');
    });

    return router;
  }
}

export default API;
