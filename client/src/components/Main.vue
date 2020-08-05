<template>
  <div class="card text-center mx-auto my-auto">
    <div class="card-body">
      <h3 class="card-title shadow"><font-awesome-icon :icon="['fas', 'hand-scissors']" /> Snip</h3>
      <h6 class="card-subtitle mb-3 text-muted shadow">
        The simple, no-bs
        <a href="https://en.wikipedia.org/wiki/URL_shortening" target="_blank">link shortener</a>.
      </h6>
      <form v-on:submit.prevent="shorten()">
        <div class="form-group mb-3">
          <input
            @input="seen = false"
            v-model="url"
            :autocomplete="seen"
            type="text"
            class="form-control shadow"
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
          <small class="text-muted"><b>Note:</b> Snips expire after 7 days if inactive.</small>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data: function() {
    return {
      seen: false,
      processed: true,
      url: '',
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
    track () {
      this.$ga.page('/')
    }
  },
};
</script>
