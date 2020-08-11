<template>
  <div class="container">
    <div class="row h-100">
      <Container />
    </div>
  </div>
</template>

<script>
import Container from './components/Container.vue';
export default {
  name: 'app',
  components: {
    Container,
  },
};
</script>
