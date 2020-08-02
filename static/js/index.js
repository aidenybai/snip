document.addEventListener('DOMContentLoaded', () => {
  Vue.use(Toasted, {
    iconPack: 'fontawesome',
  });
  new ClipboardJS('#copy');
  new Vue({
    el: '#app',
    data: {
      seen: false,
      processed: true,
    },
    methods: {
      shorten: function() {
        if (!this.processed) return;
        this.processed = false;
        grecaptcha.ready(() => {
          grecaptcha
            .execute('6Lery7gZAAAAAJEWi_hdL1VmlSkLHQlnJqN7ZH0B', { action: 'submit' })
            .then((token) => {
              const url = document.querySelector('#url').value;
              const data = {
                url,
                token,
              };

              fetch('https://api.snip.ml/v1/url', {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                method: 'post',
                body: JSON.stringify(data),
              })
                .then((response) => response.json())
                .then((data) => {
                  this.processed = true;
                  if (data.error) {
                    this.seen = false;
                    this.$toasted.error(data.message, { icon: 'exclamation' }).goAway(5000);
                  } else {
                    this.seen = true;
                    document.querySelector('#url').value = data.url;
                    this.$toasted.success('Link shortened!', { icon: 'check' }).goAway(2000);
                  }
                })
                .catch((error) => this.$toasted.error(error, { icon: 'exclamation' }).goAway(5000));
            });
        });
      },
    },
  });
});
