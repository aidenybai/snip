<template>
  <div>
    <h3 class="card-title mb-3">
      <img src="/img/icons/title-logo.svg" width="200px">
    </h3>
    <h6 class="card-subtitle mb-3 text-muted">{{ subtitle }}</h6>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PageHeader',
  data() {
    return {
      title: 'Snip',
      subtitle: 'The simple, no-bs link shortener.',
    };
  },
});
</script>
