<template>
  <div class="login-wrapper">
    <section class="login-window form-window">
      <Title :title="title" small />

      <form @submit.prevent="loginHandler">
        <FormInputText
          label="Email"
          type="email"
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

        <Callout :content="error" />

        <Button submit large type="primary">Login</Button>
        <Button to="/signup" large type="text">Request Account</Button>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import FormInputText from '@/components/FormInputText.vue';
import Button from '@/components/Button.vue';
import Title from '@/components/Title.vue';
import Callout from '@/components/Callout.vue';

import api from '@/modules/api';
import Validation from '@/modules/validation';
import {
  HighlightedTitle, CalloutContent, FieldsObject, User,
} from '@/types/data-types';

export default defineComponent({
  name: 'Login',
  components: {
    FormInputText,
    Button,
    Title,
    Callout,
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
      } as FieldsObject,
      title: {
        highlighted: 'Login',
        append: '',
      } as HighlightedTitle,
      error: {},
      fullError: {},
    };
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

        this.$store.commit('setUser', {
          token: response.data.token,
          user: response.data.user as User,
        });
        this.$router.push('/');
      } catch (error) {
        this.fullError = error;
        this.error = {
          title: (error.response) ? error.response?.data.message : error.message,
          message: Validation.generateErrorMessage(error.response?.data.fieldErrors),
        } as CalloutContent;

        Validation.matchInputErros(this.fields, error.response?.data.fieldErrors);
      }
    },
  },
  async beforeCreate() {
    if (this.$store.state.token) {
      console.log('Automatic login!');

      const { token } = this.$store.state;
      try {
        const response = await api.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.$store.commit('setUser', {
          token: response.data.token,
          user: response.data.user as User,
        });
        this.$router.push('/');
      } catch (error) {
        console.log('Automatic login failed!');
        console.error(error);
      }
    }
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

  @media (max-width: 767.98px){
    align-items: flex-start;
    padding-top: 35px;
  }

  .login-window{
    max-width: 750px;
    width:calc(100% - var(--grid-spacer) * 2);
  }
}
</style>
