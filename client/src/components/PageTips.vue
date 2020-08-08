<template>
  <p class="mt-2">
    <small class="text-muted" v-html="tip"></small>
  </p>
</template>

<script>
const tips = [
  '<b>Tip:</b> Snip is protected by <a target="_blank" href="https://www.google.com/recaptcha/about">reCAPTCHA</a>.',
  '<b>Tip:</b> Snip is powered by <a target="_blank" href="https://vuejs.org">Vue</a> & <a target="_blank" href="https://netlify.com">Netlify</a>!',
  '<b>Tip:</b> Snip is created by <a target="_blank" href="https://aiden.codes">Aiden Bai</a>.',
  '<b>Tip:</b> Snip\'s character cap is 50k characters.',
  '<b>Tip:</b> Snip is <a target="_blank" href="https://github.com/aidenybai/snip">open source on Github!</a>'
]

export default {
  name: 'PageTips',
  data: () => {
    return {
      tip: tips[Math.floor((Math.random() * tips.length))]
    };
  },
};
</script>
