<template>
  <section class="error api-error">
    <h3>{{ error.name }}</h3>
    <p>There's an error with the API: {{ error.message }}</p>
    <!-- <code class="error-details">
      {{ details }}
    </code> -->
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

// import { Error } from '../types/data-types';

export default defineComponent({
  name: 'ErrorBanner',
  props: {
    /* callback: {
      type: Function as PropType<() => void>,
    }, */
    error: {
      required: true,
      type: Object,
      // as PropType<Error> -> fix Property 'response'
      // does not exist on type 'object'.Vetur(2339)
    },
  },
  computed: {
    details(): string {
      /* let details: object = {};

      if (this.error?.response.data) {
        console.log('1');
        details = this.error?.response?.data;
      } else if (this.error?.config) {
        console.log('2');
        details = this.error?.config;
      } else {
        console.log('3');
        details = this.error;
      }
      console.log('4');
      // return this.error; */

      return JSON.stringify(this.error);
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

.error-details{
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-family: var(--font-sans);
  line-height:1;
  font-size: .8rem;
  background: rgb(240, 216, 216);
  border-radius: 6px;
}
</style>
