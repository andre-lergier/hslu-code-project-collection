<template>
  <section class="error api-error">
    <h3>{{ error.name }}</h3>
    <p>There's an error with the API: {{ error.message }}</p>
    <code>
      {{ details }}
    </code>
  </section>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { Error } from '../types/data-types';

export default defineComponent({
  name: 'ErrorBanner',
  props: {
    callback: {
      type: Function as PropType<() => void>,
    },
    error: {
      required: true,
      type: Object as PropType<Error>,
    },
  },
  computed: {
    details(): string {
      let details: object = {};

      if (this.error.errorDetails) {
        details = this.error.errorDetails;
      } else if (this.error.config) {
        details = this.error.config;
      }

      return JSON.stringify(details);
    },
  },
});
</script>

<style lang="scss" scoped>
.error{
  background: var(--color-gray-light);
  padding: var(--grid-spacer);
  border-radius:10px;
  margin-top:50px;
}
</style>
