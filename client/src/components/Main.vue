<template>
  <div class="card text-center mx-auto my-auto">
    <div class="card-body">
      <h3 class="card-title"><font-awesome-icon :icon="['fas', 'hand-scissors']" /> Snip</h3>
      <h6 class="card-subtitle mb-3 text-muted">
        The simple, no-<font-awesome-icon :icon="['fas', 'poo']" />
        link shortener.
      </h6>
      <form v-on:submit.prevent="shorten()">
        <div class="form-group mb-3">
          <input
            @input="seen = false"
            v-model="url"
            :autocomplete="seen"
            type="text"
            class="form-control"
            id="url"
            maxlength="50000"
            minlength="3"
            placeholder="Enter link"
            required
          />
        </div>

        <transition name="fade">
          <button v-if="!seen" type="submit" class="btn btn-primary px-3 mr-2 shadow">
            <font-awesome-icon :icon="['fas', 'link']" /> Shorten
          </button>
          <button
            v-if="seen"
            @click="copy"
            type="button"
            class="btn btn-outline-primary mr-2 shadow"
          >
            <font-awesome-icon :icon="['fas', 'copy']" /> Copy
          </button>
          ></transition
        >

        <p class="mt-2">
          <small class="text-muted" v-html="tip"></small>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
const tips = [
  '<b>Note:</b> Inactive Snips expire after 1 week.',
  '<b>Note:</b> Snip is protected by ReCaptcha V3.',
  '<b>Note:</b> Snip is powered by Vue & Netlify!',
  '<b>Note:</b> Snip is created by <a href="https://aiden.codes">Aiden Bai</a>.',
  '<b>Note:</b> Snip\'s character cap is 50k characters.',
  '<b>Note:</b> Snip is <a href="https://github.com/aidenybai/snip">open source on Github!</a>'
]

export default {
  name: 'Main',
  data: function() {
    return {
      seen: false,
      processed: true,
      url: '',
      tip: tips[Math.floor((Math.random() * tips.length))]
    };
  },
  methods: {
    shorten: async function() {
      if (!this.processed) return;
      this.processed = false;
      await this.$recaptchaLoaded();
      const token = await this.$recaptcha('submit');
      const data = {
        url: this.url,
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
            this.$toast.error(data.message, { timeout: 5000 });
          } else {
            this.seen = true;
            this.url = data.url;
            this.$toast.success('Link Shortened!', { timeout: 2000 });
          }
        })
        .catch((err) => this.$toast.error(err, { timeout: 5000 }));
    },
    copy: function() {
      this.$copyText(this.url)
        .then(() => {
          this.$toast.info('Copied Link!', { timeout: 2000 });
        })
        .catch((err) => {
          this.$toast.error(err, { timeout: 5000 });
        });
    },
  },
};
</script>
