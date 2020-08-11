import Vue from 'vue';

const manager = new Vue({
  data() {
    return {
      baseURL: 'https://api.snip.ml/v1/url',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
  },
  methods: {
    async create(url, token) {
      try {
        const res = await fetch(this.baseURL, {
          headers: this.headers,
          method: 'post',
          body: JSON.stringify({
            url,
            token,
          }),
        });
        const data = await res.json();
        return data;
      } catch (err) {
        throw new Error({ error: true, message: err });
      }
    },
    async get(id) {
      try {
        const res = await fetch(`${this.baseURL}?id=${id}`);
        const data = await res.json();
        return data;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
});

export default {
  install(MainVue) {
    MainVue.prototype.$snip = manager;
  },
};
