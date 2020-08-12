import fetch from 'isomorphic-fetch';

class Fetch {
  // eslint-disable-next-line class-methods-use-this
  async get(url: string): Promise<unknown> {
    const response: Response = await fetch(url, {
      method: 'get',
    });

    const body = await response.text();

    return body;
  }

  // eslint-disable-next-line class-methods-use-this
  async post(url: string): Promise<unknown> {
    const response: Response = await fetch(url, {
      method: 'post',
    });

    const body = await response.json();

    return body;
  }
}

export default Fetch;
