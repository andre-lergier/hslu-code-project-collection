<template>
  <section v-if="Object.keys(content).length" :class="['callout', `callout-${type}`]">
    <h3>{{ content.title }}</h3>
    <div class="callout-details">
      <p v-if="content.message">{{ content.message }}</p>
      <ul  v-if="content.fieldErrors">
        <li v-for="(detail, index) of details" :key="index">{{ detail }}</li>
      </ul>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { CalloutContent } from '@/types/data-types';

export default defineComponent({
  name: 'Callout',
  props: {
    callback: {
      type: Function as PropType<() => void>,
    },
    content: {
      required: true,
      type: Object as PropType<CalloutContent>,
    },
    type: {
      type: String,
      default: 'error',
      required: false,
    },
  },
  computed: {
    details(): string[] {
      const details = [];
      if (this.content.fieldErrors?.length) {
        // eslint-disable-next-line no-restricted-syntax
        for (const validationError of this.content.fieldErrors) {
          details.push(validationError.msg);
        }
      }
      return details;
    },
  },
});
</script>

<style lang="scss" scoped>
.callout{
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

  &.callout-success{
    &::before{
      background: var(--color-success);
    }

    h3{
      color: var(--color-success);
    }
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

.callout-details{
  font-size: .8rem;
}
</style>
