<template>
  <div class="login-wrapper">
    <section class="login-window">
      <Title :title="title" small />

      <form @submit.prevent="loginHandler">
        <FormInputText
          label="Email"
          type="text"
          v-model.trim="fields.email.value"
          placeholder="name@domain.ch"
          :error="fields.email.error"
        />
        <FormInputText
          label="Password"
          type="password"
          v-model.trim="fields.password.value"
          placeholder="••••••••"
          :error="fields.password.error"
        />

        <Error :error="error" />

        {{ error }}

        <Button submit large type="primary">Login</Button>
        <Button to="/signup" large type="text">Request Account</Button>
      </form>

      {{ fullError }}
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import FormInputText from '@/components/FormInputText.vue';
import Button from '@/components/Button.vue';
import Title from '@/components/Title.vue';
import Error from '@/components/Error.vue';
import api from '@/modules/api';

import {
  HighlightedTitle, ValidationError, InputValidationError, DataObject,
} from '../types/data-types';

export default defineComponent({
  name: 'Login',
  components: {
    FormInputText,
    Button,
    Title,
    Error,
  },
  props: {
  },
  data() {
    return {
      fields: {
        email: {
          value: '',
          error: '',
        },
        password: {
          value: '',
          error: '',
        },
      },
      title: {
        highlighted: 'Login',
        append: '',
      } as HighlightedTitle,
      error: {},
      fullError: {},
    } as DataObject;
  },
  computed: {},
  methods: {
    async loginHandler() {
      // clean up errors
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const field in this.fields) {
        this.fields[field].error = '';
      }

      // login api call
      try {
        const response = await api.post('/user/login', {
          email: this.fields.email.value,
          password: this.fields.password.value,
        });

        this.$store.commit('setToken', response.data.token);
        this.$router.push('/');
      } catch (error) {
        this.fullError = error;
        this.error = {
          title: error.message,
          message: error.response.data.message,
          fieldErrors: error.response.data.fieldErrors,
        } as ValidationError;

        this.checkInputErros(error.response.data?.fieldErrors);
      }
    },
    checkInputErros(errors: InputValidationError[]) {
      if (errors) {
        // eslint-disable-next-line no-restricted-syntax
        for (const error of errors) {
          if (error.param in this.fields) {
            this.fields[error.param].error = error.msg;
          }
        }
      }
    },
    typedKeys<T>(o: T): (keyof T)[] {
      // type cast should be safe because that's what really Object.keys() does
      return Object.keys(o) as (keyof T)[];
    },
  },
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
