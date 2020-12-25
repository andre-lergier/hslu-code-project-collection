<template>
  <div class="login-wrapper">
    <section class="login-window form-window">
      <Title :title="title" small />

      <template  v-if="!success.state">
        <form @submit.prevent="signupHandler">
          <div class="grid">
            <FormInputText
              class="g-md-6"
              label="Firstname"
              v-model.trim="fields.firstname.value"
              placeholder="Max"
              :error="fields.firstname.error"
            />
            <FormInputText
              class="g-md-6"
              label="Name"
              v-model.trim="fields.familyname.value"
              placeholder="Muster"
              :error="fields.familyname.error"
            />
          </div>

          <FormInputText
            class="mt"
            label="Email"
            type="email"
            v-model.trim="fields.email.value"
            placeholder="name@domain.ch"
            :error="fields.email.error"
          />

          <FormInputText
            class="g-md-6"
            label="Password"
            type="password"
            v-model.trim="fields.password.value"
            placeholder="••••••••"
            autocomplete="new-password"
            :error="fields.password.error"
          />
          <!-- <FormInputText
            class="g-md-6"
            label="Repeat Password"
            type="password"
            v-model.lazy="fields.passwordConfirmation.value"
            placeholder="••••••••"
            autocomplete="new-password"
            :error="passwordConfirmationError"
          /> -->

          <Callout :content="error" />

          <Button submit large type="primary">Request Account</Button>
          <Button to="/login" large type="text">Login</Button>
        </form>
      </template>

      <template v-else>
        <Callout :content="success.content" type="success" />
      </template>
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
  HighlightedTitle, CalloutContent, FieldsObject,
} from '@/types/data-types';

export default defineComponent({
  name: 'Signup',
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
        firstname: {
          value: '',
          error: '',
        },
        familyname: {
          value: '',
          error: '',
        },
        email: {
          value: '',
          error: '',
        },
        password: {
          value: '',
          error: '',
        },
        passwordConfirmation: {
          value: '',
          error: '',
        },
      } as FieldsObject,
      title: {
        prepend: 'Request ',
        highlighted: 'Account',
      } as HighlightedTitle,
      error: {},
      fullError: {},
      success: {
        state: false,
        content: {},
      },
    };
  },
  computed: {
    token(): string {
      return this.$store.state.token;
    },
  },
  methods: {
    async signupHandler() {
      // clean up errors
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const field in this.fields) {
        this.fields[field].error = '';
      }

      // api call
      try {
        const response = await api.post('/user', {
          firstname: this.fields.firstname.value,
          familyname: this.fields.familyname.value,
          email: this.fields.email.value,
          password: this.fields.password.value,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        console.log(`User ${response.data.userId} successfully created.`);

        this.success.content = {
          title: 'Request successful!',
          message: `Thank you, ${this.fields.firstname.value}! Your Account was successfully requested.`,
        } as CalloutContent;
        this.success.state = true;

        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const field in this.fields) {
          this.fields[field].value = '';
        }
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
