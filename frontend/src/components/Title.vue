<template>
  <h1>
    <span>{{ title }}</span>
    <small>{{ subtitle }}</small>
  </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Title',
  props: {
    text: String,
    subtitle: String,
  },
});
</script>

<style scoped lang="scss">

</style>
