<template>
  <p class="mt-2">
    <small class="text-muted">
      <b><font-awesome-icon :icon="['fas', 'info-circle']" /></b> <span v-html="tip"></span>
    </small>
  </p>
</template>

<script lang="ts">
import Vue from 'vue';

const tips = [
  'Snip is protected by <a target="_blank" href="https://www.google.com/recaptcha/about">reCAPTCHA</a>.',
  'Snip is powered by <a target="_blank" href="https://vuejs.org">Vue</a> & <a target="_blank" href="https://netlify.com">Netlify</a>!',
  'Snip is created by <a target="_blank" href="https://aiden.codes">Aiden Bai</a>.',
  "Snip's character cap is 100k characters.",
  'All snips expire after 7 days.',
  'Snip is <a target="_blank" href="https://github.com/aidenybai/snip">open source on Github!</a>',
];

export default Vue.extend({
  name: 'PageTips',
  data() {
    return {
      tip: tips[Math.floor(Math.random() * tips.length)], // Get random tip (thanks stackoverflow)
    };
  },
});
</script>
