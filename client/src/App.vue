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