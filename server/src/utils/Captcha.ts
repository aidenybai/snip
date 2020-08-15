import Fetch from './Fetch';
import config from '../config/production';

class Captcha {
  fetch: Fetch;

  secret: string;

  constructor() {
    this.fetch = new Fetch();
    this.secret = config.SECRET;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async data(token: string): Promise<any> {
    try {
      const url = `https://www.google.com/recaptcha/api/siteverify?secret=${this.secret}&response=${token}`;
      const body = await this.fetch.post(url);

      return body;
    } catch (err) {
      return undefined;
    }
  }
}

export default Captcha;
