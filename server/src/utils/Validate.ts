import Fetch from './Fetch';
import URL from 'url';

class Validate {
  fetch: Fetch;
  max: number;
  min: number;
  baseURL: string;

  constructor(opts: any = {}) {
    this.fetch = new Fetch();
    this.max = opts.max || 10000;
    this.min = opts.min || 3;
    this.baseURL = opts.baseURL || 'snip.ml';
  }

  async url(url: string): Promise<any> {
    if (!url) return { error: true, message: 'You must provide a url body parameter' };
    if (url.length > this.max) {
      return { error: true, message: 'URL length must be less than 10000' };
    }
    if (url.length < this.min) {
      return { error: true, message: 'URL length must be greater than 3' };
    }
    if (URL.parse(url).host.includes('snip.ml')) {
      return { error: true, message: 'Base url cannot be snip.ml' };
    }

    try {
      await this.fetch.get({ url });

      return { error: false };
    } catch (err) {
      return { error: true, message: 'Please provide an valid url' };
    }
  }
}

export default Validate;
