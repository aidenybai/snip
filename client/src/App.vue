<template>
  <div class="container">
    <div class="row h-100">
      <Main />
    </div>
  </div>
</template>

<script>
import Main from './components/Main.vue';
export default {
  name: 'app',
  components: {
    Main,
  },
};
</script>

<style lang="scss">
@import './assets/scss/main.scss';
@import './assets/scss/_buttons.scss';
@import './assets/scss/_cards.scss';
@import './assets/scss/_inputs.scss';
@import './assets/scss/_transitions.scss';
@import './assets/scss/_typography.scss';
@import './assets/scss/_misc.scss';
</style>
