<template>
  <form v-on:submit.prevent="shorten">
    <div class="form-group mb-3">
      <input
        @input="seen = false"
        v-model="url"
        :autocomplete="seen"
        type="text"
        id="url"
        class="form-control"
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
      <button v-if="seen" @click="copy" type="button" class="btn btn-outline-primary mr-2 shadow">
        <font-awesome-icon :icon="['fas', 'copy']" /> Copy
      </button>
    </transition>

    <PageTips />
  </form>
</template>

<script>
import Vue from 'vue';
import PageTips from '@/components/PageTips.vue';

export default Vue.extend({
  name: 'SnipForm',
  components: {
    PageTips,
  },
  data() {
    return {
      seen: false,
      processed: true,
      url: '',
    };
  },
  methods: {
    async shorten() {
      if (!this.processed) return;
      this.processed = false;
      await this.$recaptchaLoaded();
      const token = await this.$recaptcha('submit');
      const data = await this.$snip.create(this.url, token);
      this.processed = true;
      if (data.error) {
        this.seen = false;
        this.$toast.error(data.message, { timeout: 5000 });
      } else {
        this.seen = true;
        this.url = data.url;
        this.$toast.success('Link Shortened!', { timeout: 2000 });
      }
    },
    async copy() {
      try {
        await this.$copyText(this.url);
        this.$toast.info('Copied Link!', { timeout: 2000 });
      } catch (err) {
        this.$toast.error(err, { timeout: 5000 });
      }
    },
  },
});
</script>
