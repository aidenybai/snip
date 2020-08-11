<template>
  <div class="container">
    <div class="row h-100">
      <Container />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Container from '@/components/Container.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Container,
  },
});
</script>
