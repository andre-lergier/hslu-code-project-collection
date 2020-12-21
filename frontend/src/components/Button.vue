<template>
  <router-link v-if="to" :to="to" :class="classList">
    <slot />
  </router-link>
  <button
    v-if="submit"
    class="button"
    :class="classList"
    type="submit"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    to: {
      required: false,
      defualt: '',
      type: String,
    },
    submit: {
      required: false,
      default: false,
      type: Boolean,
    },
    large: {
      required: false,
      default: false,
      type: Boolean,
    },
    type: {
      required: false,
      default: 'default',
      type: String,
    },
  },
  computed: {
    classList(): any[] {
      return [
        { 'button-large': this.large },
        'button',
        `button-${this.type}`,
      ];
    },
  },
});
</script>

<style scoped lang="scss">
.button{
  font-size: .9rem;
  display: inline-block;
  background: white;
  border: 2px solid #ccc;
  line-height:1;
  padding: 10px 18px;
  border-radius:50px;
  appearance: none;
  font-variation-settings: 'wght' 450;
  color: var(--color-text);
  transition: all .3s ease;
  cursor: pointer;

  &:not(:last-child){
    margin-right: calc(var(--grid-spacer) / 2);
  }

  &.button-large{
    font-size: 1rem;
    padding: 11px 23px;
  }

  &.button-primary{
    background: var(--color-dark-blue);
    border-color: var(--color-dark-blue);
    color: white;
    font-variation-settings: 'wght' 500;

    &:hover{
      background: var(--color-blue);
      border-color: var(--color-blue);
    }
  }

  &.button-text{
    background: transparent;
    border-color: transparent;
    color: var(--color-text-light);
    font-variation-settings: 'wght' 400;

    &:hover{
      color: var(--color-text);
      background: var(--color-gray-light);
    }
  }

  &:focus{
    outline: none;
  }
}
</style>
