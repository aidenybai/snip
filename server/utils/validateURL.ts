import fetch from 'isomorphic-fetch';
import URL from 'url';

const validateURL = async (url) => {
  if (!url) return { error: true, message: 'You must provide a url body parameter' };
  if (url.length > 50000) return { error: true, message: 'URL length must be less than 50000' };
  if (url.length < 3) return { error: true, message: 'URL length must be greater than 3' };
  if (URL.parse(url).host.includes('snip.ml'))
    return { error: true, message: 'Base url cannot be snip.ml' };

  try {
    const response = await fetch(url, {
      method: 'get',
    });

    return { error: false };
  } catch (err) {
    return { error: true, message: 'Please provide an valid url' };
  }
};

export default validateURL;
