import URL from 'url';
import Fetch from './Fetch';

class Validate {
  fetch: Fetch;

  max: number;

  min: number;

  baseURL: string;

  constructor(opts: Record<string, number> = {}) {
    this.fetch = new Fetch();
    this.baseURL = 'snip.ml';
    this.max = opts.max || 100000;
    this.min = opts.min || 3;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async url(url: string): Promise<Record<string, any>> {
    /*
     * Validation covered:
     * URL exists?
     * URL length is <= max character length
     * URL length is >= min character length
     * URL doesn't include base URL
     * GET request to URL if content exists
     */
    if (!url) return { error: true, message: 'You must provide a url body parameter' };
    if (url.length > this.max) {
      return { error: true, message: `URL length must be less than ${this.max}` };
    }
    if (url.length < this.min) {
      return { error: true, message: `URL length must be greater than ${this.min}` };
    }
    if (URL.parse(url).host.includes(this.baseURL)) {
      return { error: true, message: `Base url cannot be ${this.baseURL}` };
    }

    try {
      await this.fetch.get(url);

      return { error: false };
    } catch (err) {
      return { error: true, message: 'Please provide an valid url' };
    }
  }
}

export default Validate;
