<template>
  <h1 :class="{ 'small': small }">
    <span>
      <span v-if="title.prepend">{{ title.prepend }}</span>
      <span class="highlighted">{{ title.highlighted }}</span>
      <span v-if="title.append"> {{ title.append }}</span>
    </span>
    <small>{{ subtitle }}</small>
  </h1>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { HighlightedTitle } from '../types/data-types';

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
    small: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss">
h1{
  display: flex;
  flex-direction: column;
  font-size: 3.5rem;
  margin-bottom:55px;

  @media (max-width: 767.98px){
    font-size: 2.65rem;
  }

  &.small{
    font-size: 2.25rem;
    font-variation-settings: "wght" 600;
    margin-bottom:15px;
    margin-top:10px;

    @media (max-width: 767.98px){
      font-size: 2rem;
    }
  }

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
    z-index:1;

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
      opacity:.75;
    }
  }
}
</style>
