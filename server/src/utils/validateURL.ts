import fetch from 'isomorphic-fetch';
import URL from 'url';

const validateURL = async (url: string) => {
  if (!url) return { error: true, message: 'You must provide a url body parameter' };
  if (url.length > 20000) return { error: true, message: 'URL length must be less than 20000' };
  if (url.length < 3) return { error: true, message: 'URL length must be greater than 3' };
  if (URL.parse(url).host.includes('snip.ml'))
    return { error: true, message: 'Base url cannot be snip.ml' };

  try {
    await fetch(url, {
      method: 'get',
    });

    return { error: false };
  } catch (err) {
    return { error: true, message: 'Please provide an valid url' };
  }
};

export default validateURL;
