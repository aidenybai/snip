<template>
  <p class="mt-2">
    <small class="text-muted" v-html="tip"></small>
  </p>
</template>

<script>
const tips = [
  '<b>Note:</b> Snip is protected by ReCaptcha V3.',
  '<b>Note:</b> Snip is powered by Vue & Netlify!',
  '<b>Note:</b> Snip is created by <a href="https://aiden.codes">Aiden Bai</a>.',
  '<b>Note:</b> Snip\'s character cap is 50k characters.',
  '<b>Note:</b> Snip is <a href="https://github.com/aidenybai/snip">open source on Github!</a>'
]

export default {
  name: 'PageTips',
  data: function() {
    return {
      tip: tips[Math.floor((Math.random() * tips.length))]
    };
  },
};
</script>
