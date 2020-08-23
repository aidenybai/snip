import { Router } from 'express';
import normalizeURL from 'normalize-url';
import Route from './Route';
import Snip from '../../models/Snip';
import Hash from '../../utils/Hash';
import Captcha from '../../utils/Captcha';
import Validate from '../../utils/Validate';

class API extends Route {
  path: string;

  hash: Hash;

  captcha: Captcha;

  validate: Validate;

  constructor() {
    super('/v1');
    this.hash = new Hash();
    this.captcha = new Captcha();
    this.validate = new Validate();
  }

  run(): Router {
    const router = Router();

    // Handles url creation
    // eslint-disable-next-line consistent-return
    router.post('/url', async (req, res): Promise<unknown> => {
      const captchaResponse = await this.captcha.data(req.body.token);
      if (!captchaResponse.success) return res.boom.forbidden('Token failure (refresh page)');
      // 0.1 is a bot, > 0.7 is likely human
      if (captchaResponse.score < 0.5) {
        return res.boom.forbidden(
          `Your bot score (${captchaResponse.score || null}) is less than 0.5`,
        );
      }

      // Users can provide a specific id if they want, else default gen
      const id = req.body.id ? req.body.id : this.hash.generate();

      // Find snip url by id
      const url = await Snip.findOne({ id });

      if (url) {
        res.boom.badRequest('ID already taken');
      } else {
        try {
          // Need to normalize url before validation: test.com -> https://test.com
          const normalizedURL = normalizeURL(req.body.url);

          // Validate will return a object with message as status
          const validate = await this.validate.url(normalizedURL);

          if (validate.error) return res.boom.badRequest(validate.message);

          // Find snip url by url
          const existing = await Snip.findOne({ url: normalizedURL });

          // Throw back existing snip url, else if unique give back generated
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

    // Handles url lookup
    router.get('/url', async (req, res) => {
      const url = await Snip.findOne({ id: req.query.id });

      if (url) {
        res.json(url);
      } else {
        res.boom.badRequest('url not found');
      }
    });

    router.get('/ping', async (req, res) => {
      // Need for pinging status service
      res.send('OK');
    });

    return router;
  }
}

export default API;
