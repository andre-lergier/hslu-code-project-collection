<template>
  <section v-if="Object.keys(error).length" class="error">
    <h3>{{ error.message }}</h3>
    <p v-if="error.details">{{ error.details }}</p>
    <ul  v-if="error.fieldErrors">
      <li v-for="(detail, index) of details" :key="index">{{ detail }}</li>
    </ul>
  </section>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { ValidationError } from '../types/data-types';

export default defineComponent({
  name: 'Error',
  props: {
    callback: {
      type: Function as PropType<() => void>,
    },
    error: {
      required: true,
      type: Object as PropType<ValidationError>,
    },
  },
  computed: {
    details(): string[] {
      const details = [];
      if (this.error.fieldErrors?.length) {
        // eslint-disable-next-line no-restricted-syntax
        for (const validationError of this.error.fieldErrors) {
          details.push(validationError.msg);
        }
      }
      return details;
    },
  },
});
</script>

<style lang="scss" scoped>
.error{
  background: var(--color-gray-light);
  padding: var(--grid-spacer);
  padding-left: 25px;
  border-radius:10px;
  margin-top:20px;
  margin-bottom:20px;
  position: relative;
  overflow:hidden;
  // border-left: 5px solid rgb(240, 216, 216);

&::before{
  content: '';
  display:block;
  width: 5px;
  height: 100%;
  position: absolute;
  top:0;
  left:0;
  background: var(--color-error);
}

  h3{
    font-size: 1rem;
    font-variation-settings: 'wght' 600;
    color: var(--color-error);
  }

  ul{
    padding-left: 20px;
    margin:0;
    font-size:.9rem;
  }
}

.error-details{
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-family: var(--font-sans);
  line-height:1;
  font-size: .8rem;
  border-radius: 6px;
}
</style>
