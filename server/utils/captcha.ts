import fetch from 'isomorphic-fetch';
import config from '../config/production';

const captcha = async (token: string) => {
  try {
    const url: string = `https://www.google.com/recaptcha/api/siteverify?secret=${config.SECRET}&response=${token}`;

    const response: Response = await fetch(url, {
      method: 'post',
    });

    const body = await response.json();

    return body;
  } catch (err) {
    return undefined;
  }
};

export default captcha;
