import fetch from 'isomorphic-fetch';

class Fetch {
  url: string;

  async get(url: string): Promise<unknown> {
    this.url = url;
    const response: Response = await fetch(this.url, {
      method: 'get',
    });

    const body = await response.json();

    return body;
  }

  async post(url: string): Promise<unknown> {
    this.url = url;
    const response: Response = await fetch(this.url, {
      method: 'post',
    });

    const body = await response.json();

    return body;
  }
}

export default Fetch;
