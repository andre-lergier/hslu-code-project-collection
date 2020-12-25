<template>
  <div class="form-wrapper">
    <div class="container">
      <section class="form-window">
        <Title :title="title" small />
        <template  v-if="!success.state">
          <form @submit.prevent="createHandler">
            <div class="grid">
              <FormInputText
                class="g-md-6"
                label="Title"
                v-model.trim="fields.title.value"
                placeholder="My Project"
                :error="fields.title.error"
              />
              <FormInputText
                class="g-md-6"
                label="Year"
                type="number"
                v-model.number="fields.year.value"
                placeholder="2021"
                :error="fields.year.error"
              />
            </div>
            <FormInputText
              class="g-md-6"
              label="Category"
              v-model.trim="fields.category.value"
              placeholder="Lergier Design"
              :error="fields.category.error"
            />

            <h4 class="form-section">Repository</h4>
            <div class="grid">
              <FormInputText
                class="g-md-6"
                label="Platform"
                v-model.trim="fields.respositoryPlatform.value"
                placeholder="GitHub"
                :error="fields.respositoryPlatform.error"
              />
              <FormInputText
                class="g-md-6"
                label="Name"
                v-model.number="fields.respositoryName.value"
                placeholder="andre-lergier/my-project"
                :error="fields.respositoryName.error"
              />
            </div>

            <FormInputText
              label="Link"
              type="url"
              v-model.number="fields.respositoryUrl.value"
              placeholder="https://github.com/andre-lergier/my-project"
              :error="fields.respositoryUrl.error"
            />

            <h4 class="form-section">Links</h4>
            <div class="grid">
              <FormInputText
                class="g-md-6"
                label="Public Link"
                v-model.trim="fields.publicLinkUrl.value"
                placeholder="my-project.ch"
                :error="fields.publicLinkUrl.error"
              />
              <FormInputText
                class="g-md-6"
                label="Public Link Tags"
                v-model.number="fields.publicLinkTags.value"
                placeholder="Netlify, Bitbucket"
                :error="fields.publicLinkTags.error"
              />
            </div>
            <div class="grid">
              <FormInputText
                class="g-md-6"
                label="Dev Link"
                v-model.trim="fields.devLinkUrl.value"
                placeholder="my-project.dev.lergier.ch"
                :error="fields.devLinkUrl.error"
              />
              <FormInputText
                class="g-md-6"
                label="Dev Link Tags"
                v-model.number="fields.devLinkTags.value"
                placeholder="Netlify, Bitbucket"
                :error="fields.devLinkTags.error"
              />
            </div>

            <h4 class="form-section">Databse</h4>
            <FormInputText
              label="Title"
              v-model.trim="fields.databaseTitle.value"
              placeholder="PhpMyAdmin"
              :error="fields.databaseTitle.error"
            />
            <div class="grid">
              <FormInputText
                class="g-md-6"
                label="Link"
                v-model.number="fields.databaseUrl.value"
                placeholder="https://database.host.ch/phpmyadmin"
                :error="fields.databaseUrl.error"
              />
              <FormInputText
                class="g-md-6"
                label="Tags"
                v-model.trim="fields.databaseTags.value"
                placeholder="MySQL"
                :error="fields.databaseTags.error"
              />
            </div>

            <Callout :content="error" />

            <Button submit large type="primary">Create Project</Button>
          </form>
        </template>

        <template v-else>
          <Callout :content="success.content" type="success" />
        </template>
      </section>
    </div>
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
  name: 'NewProject',
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
        title: {
          value: '',
          error: '',
        },
        category: {
          value: '',
          error: '',
        },
        year: {
          value: '',
          error: '',
        },
        private: {
          value: '',
          error: '',
        },
        respositoryPlatform: {
          value: '',
          error: '',
        },
        respositoryName: {
          value: '',
          error: '',
        },
        respositoryUrl: {
          value: '',
          error: '',
        },
        publicLinkUrl: {
          value: '',
          error: '',
        },
        publicLinkTags: {
          value: '',
          error: '',
        },
        devLinkUrl: {
          value: '',
          error: '',
        },
        devLinkTags: {
          value: '',
          error: '',
        },
        databaseTitle: {
          value: '',
          error: '',
        },
        databaseUrl: {
          value: '',
          error: '',
        },
        databaseTags: {
          value: '',
          error: '',
        },
      } as FieldsObject,
      title: {
        prepend: 'New ',
        highlighted: 'Project',
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
    async createHandler() {
      // clean up errors
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const field in this.fields) {
        this.fields[field].error = '';
      }

      const data = {
        title: this.fields.title.value,
        category: this.fields.category.value,
        year: this.fields.year.value,
        private: true,
        publicLink: {
          url: this.fields.publicLinkUrl.value,
          tags: this.fields.publicLinkTags.value.split(', '),
        },
        devLink: {
          url: this.fields.devLinkUrl.value,
          tags: this.fields.devLinkTags.value.split(', '),
        },
        repository: {
          platform: this.fields.respositoryPlatform.value,
          name: this.fields.respositoryName.value,
          url: this.fields.respositoryUrl.value,
        },
        database: {
          title: this.fields.databaseTitle.value,
          url: this.fields.databaseUrl.value,
          tags: this.fields.databaseTags.value.split(', '),
        },
      };

      // api call
      try {
        const response = await api.post('/projects', data, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        console.log(`Project ${response.data.projectId} successfully created.`);

        this.success.content = {
          title: 'Request successful!',
          message: `The project ${response.data.project.title} was successfully created.`,
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
<style lang="scss">
.form-section{
  margin-top: 35px;
  margin-bottom:5px;
  font-size:1rem;
  font-variation-settings: 'wght' 750;
  border-top: 1px solid #ddd;
  padding-top: 35px;
}
</style>
<style lang="scss" scoped>
.form-wrapper {
  background: var(--color-gray-light);
  min-height: calc(100vh - 71px);
  padding-top: 35px;
  padding-bottom: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
