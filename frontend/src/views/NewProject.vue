<template>
  <div class="login-wrapper">
    <section class="login-window">
      <Title :title="title" small />

      <form>
        <FormInputText
          label="Jahr"
          type="number"
          v-model.number="year"
          placeholder="2021"
        />
        <FormInputText
          label="Password"
          type="password"
          v-model.trim="password"
          placeholder="••••••••"
        />
        <Button submit large type="primary">Login</Button>
        <Button to="/signup" large type="text">Request Account</Button>
      </form>
      {{ email }}
      {{ password }}
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import FormInputText from '@/components/FormInputText.vue';
import Button from '@/components/Button.vue';
import Title from '@/components/Title.vue';

import { HighlightedTitle } from '../types/data-types';

export default defineComponent({
  name: 'NewProject',
  components: {
    FormInputText,
    Button,
    Title,
  },
  props: {
  },
  data() {
    return {
      email: '',
      year: '',
      password: '',
      title: {
        highlighted: 'Login',
        append: '',
      } as HighlightedTitle,
    };
  },
  computed: {},
});
</script>

<style lang="scss" scoped>
.login-wrapper {
  background: var(--color-gray-light);
  min-height: calc(100vh - 71px);
  display: flex;
  align-items: center;
  justify-content: center;

  .login-window{
    background:white;
    flex-shrink: 0;
    flex-grow: 0;
    display:block;
    max-width: 750px;
    width:calc(100% - var(--grid-spacer) * 2);
    padding:25px 30px;
    border-radius: 12px;
    box-shadow: 0 15px 30px rgba(0,0,0,0.01);
  }
}
</style>
