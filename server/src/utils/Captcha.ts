import Fetch from './Fetch';
import config from '../config/production';

class Captcha {
  fetch: Fetch;

  secret: string;

  constructor() {
    this.fetch = new Fetch();
    // V3 token (be sure to whitelist localhost and snip.ml)
    this.secret = config.SECRET;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async data(token: string): Promise<any> {
    try {
      // Captcha returns some data, else return undefined
      // https://developers.google.com/recaptcha/docs/v3#site_verify_response
      const url = `https://www.google.com/recaptcha/api/siteverify?secret=${this.secret}&response=${token}`;
      const body = await this.fetch.post(url);

      return body;
    } catch (err) {
      return undefined;
    }
  }
}

export default Captcha;
