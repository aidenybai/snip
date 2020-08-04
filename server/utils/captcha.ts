import fetch from 'isomorphic-fetch';
import config from '../config/production';

const captcha = async (token) => {
  try {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${config.SECRET}&response=${token}`;

    const response = await fetch(url, {
      method: 'post',
    });

    const body = await response.json();

    return body;
  } catch (err) {
    return undefined;
  }
};

export default captcha;
