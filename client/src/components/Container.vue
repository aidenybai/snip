<template>
  <div class="card text-center mx-auto my-auto">
    <div class="card-body">
      <PageHeader />
      <SnipForm />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PageHeader from '@/components/PageHeader.vue';
import SnipForm from '@/components/SnipForm.vue';

export default Vue.extend({
  name: 'Container',
  components: {
    PageHeader,
    SnipForm,
  },
});
</script>
