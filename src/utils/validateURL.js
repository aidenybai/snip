const fetch = require('isomorphic-fetch');

const validateURL = async (url) => {
  if (!url) return { error: true, message: 'you must provide a url body parameter' };
  if (url.length > 2000) return { error: true, message: 'url length must be less than 2000' };
  if (url.length < 3) return { error: true, message: 'url length must be greater than 3' };
  if (url.includes('https://snip.ml'))
    return { error: true, message: 'base url cannot be snip.ml' };

  const response = await fetch(url, {
    method: 'get',
  });

  return { error: response.ok, message: 'please provide an valid url' };
};

module.exports = validateURL;
