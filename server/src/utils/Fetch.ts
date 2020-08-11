import fetch from 'isomorphic-fetch';

class Fetch {
  async get(opts: any): Promise<any> {
    const response: Response = await fetch(opts.url, {
      method: 'get',
    });

    const type = opts.type.toLowerCase() === 'json';
    const body: Promise<any> = type ? response.json() : response.text();

    return await body;
  }

  async post(opts: any): Promise<any> {
    const response: Response = await fetch(opts.url, {
      method: 'post',
    });

    const type = opts.type.toLowerCase() || 'json';
    const body: Promise<any> = type === 'json' ? response.json() : response.text();

    return await body;
  }
}

export default Fetch;
