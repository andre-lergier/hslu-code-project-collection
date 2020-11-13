<template>
  <h1>
    <span><span class="highlighted">{{ title.highlighted }}</span> {{ title.append }}</span>
    <small>{{ subtitle }}</small>
  </h1>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { HighlightedTitle } from '../data-types';

export default defineComponent({
  name: 'Title',
  props: {
    callback: {
      type: Function as PropType<() => void>,
    },
    title: {
      type: Object as PropType<HighlightedTitle>,
      required: true,
    },
    subtitle: String,
  },
});
</script>

<style scoped lang="scss">
h1{
  display: flex;
  flex-direction: column;
  font-size: 3.5rem;
  margin-bottom:55px;

  small{
    font-size: 1rem;
    font-family: var(--font-sans);
    font-weight:500;
    margin-top: 20px;
  }

  span{
    line-height:1;
  }

  .highlighted{
    position:relative;
    display: inline-block;

    &::after{
      content:'';
      position: absolute;
      display:block;
      top:70%;
      left:-3px;
      bottom:-10%;
      right:-5px;
      z-index:-1;
      background: var(--color-yellow);
    }
  }
}
</style>
