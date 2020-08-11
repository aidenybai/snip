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
    async create(url: string, token: string) {
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
        throw new Error(err);
      }
    },
    async get(id: string) {
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
  install(MainVue: any) {
    /* eslint-disable no-param-reassign */
    MainVue.prototype.$snip = manager;
  },
};
