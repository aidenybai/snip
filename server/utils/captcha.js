const fetch = require('isomorphic-fetch');
const config = require('../config/production.js');

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

module.exports = captcha;
