<template>
  <div class="card text-center mx-auto my-auto">
    <div class="card-body">
      <PageHeader />
      <SnipForm />
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import SnipForm from '@/components/SnipForm';

export default {
  name: 'Container',
  components: {
    PageHeader,
    SnipForm
  }
};
</script>
