<template>
  <div>
    <h3 class="card-title"><font-awesome-icon :icon="['fas', 'hand-scissors']" /> {{ title }}</h3>
    <h6 class="card-subtitle mb-3 text-muted">{{ subtitle }}</h6>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  data: () => {
    return {
      title: `Snip`,
      subtitle: `The simple, no-bs link shortener.`,
    };
  },
};
</script>
