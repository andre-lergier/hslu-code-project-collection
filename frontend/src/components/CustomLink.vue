<template>
  <a
    v-if="link"
    :href="link"
    :target="external ? '_blank' : '' "
    :rel="external ? 'noopener noreferrer' : '' "
    :title="title"
  >
    <slot />
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomLink',
  props: {
    link: {
      required: true,
      type: String,
    },
    external: {
      required: false,
      type: Boolean,
      default: false,
    },
    title: {
      required: false,
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped lang="scss">
</style>
