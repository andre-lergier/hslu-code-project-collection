<template>
  <div :class="['home', {'loading': loading}]">
    <section class="intro">
      <div class="container">
        <Title :title="title" :subtitle="subtitle" />
        <p class="intro__text">
          {{ introduction }}
        </p>
      </div>
    </section>

    <section v-if="!errored" class="projects">
      <section class="projects__category">
        <section class="projects__title">
          <div class="container">
            <h2>Lergier Design</h2>
          </div>
        </section>
        <section class="projects__section">
          <div class="container">
            <div class="grid">
              <project-card
                v-for="(item, index) in projects"
                :key="index"
                :project-data="item"
                class="g-md-6"/>
            </div>
          </div>
        </section>
      </section>
    </section>
    <div v-else class="container">
      <error-banner :error="error" />
    </div>

    <div class="container impressum">
      <p>
        <!-- eslint-disable-next-line max-len -->
        This page was made as an individual mentoring project at my Digital Ideation Studies at Lucerne University of Applied Science and Arts HSLU.
      </p>
      <p>
        <!-- eslint-disable-next-line max-len -->
        The source code and more about this project can be found on my GitHub-Repository <custom-link link="https://github.com/andre-lergier/hslu-web-project-collection" external>andre-lergier/hslu-web-project-collection</custom-link>.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Title from '@/components/Title.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import CustomLink from '@/components/CustomLink.vue';
import ErrorBanner from '@/components/ErrorBanner.vue';
import api from '@/modules/api';

import { HighlightedTitle } from '../types/data-types';

export default defineComponent({
  name: 'Home',
  components: {
    Title,
    ProjectCard,
    CustomLink,
    ErrorBanner,
  },
  data() {
    return {
      title: {
        highlighted: 'Code',
        append: ' Projects',
      } as HighlightedTitle,
      subtitle: 'by André Lergier | lergier.ch',
      introduction: 'It’s hard to keep track of all code projects stored on different plattforms, published under several subdomains, or deployed on various hostings. This overview is the solution for this problem and meakes it easy to find all code projects with their associated repository and links. To see private projects it’s madatory to be logged in.',
      projects: [],
      loading: true,
      errored: false,
      error: {},
    };
  },
  computed: {
    token(): string {
      return this.$store.state.token;
    },
  },
  mounted() {
    api.get('/projects', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }) // same as axios.get('http://localhost:4433/projects');
      .then((response) => {
        this.projects = response.data.projects;
        console.log(response);
      })
      .catch((error) => {
        console.log('catch view get');
        console.log(error);
        this.errored = true;
        this.error = error;
      }).finally(() => {
        this.loading = false;
      });
  },
});
</script>

<style lang="scss" scoped>
.intro{
  margin-top:120px;

  .intro__text{
    color: var(--color-text-light);
    font-size: 1.25rem;
  }
}

.projects{
  .projects__title{
    margin-top:75px;
    margin-bottom:20px;
  }

  .projects__section{
    background: var(--color-gray-light);
    padding: 40px 0;

    @media (max-width: 767.98px){
      padding: 30px 0;
    }
  }
}

.impressum{
  margin-top: 100px;
  margin-bottom:100px;
}
</style>
