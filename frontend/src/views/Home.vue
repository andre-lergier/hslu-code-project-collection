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
      <template v-for="(item, index) in restructuredProjects" :key="index">
        <section class="projects__category">
          <section class="projects__title">
            <div class="container">
              <h2>{{ item.category }}</h2>
            </div>
          </section>
          <section class="projects__section">
            <div class="container">
              <div class="grid">
                <project-card
                  v-for="project in item.projects"
                  :key="project._id"
                  :project-data="project"
                  class="g-md-6"/>
              </div>
            </div>
          </section>
        </section>
      </template>
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
      <p class="copyright">
        © by André Lergier | lergier.ch
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

import { HighlightedTitle, ProjectCategory, ProjectData } from '../types/data-types';

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
      introduction: 'This page is a personal collection of my different coding projects. It helps me to keep an overview of the git repositories, dev-, stage- and production-deployments and their particular hosting. You need to be logged in to see all project details.',
      projects: [],
      loading: true,
      errored: false,
      error: {},
      tempCategory: '',
    };
  },
  computed: {
    token(): string {
      let token = '';
      token = (this.$store.state.token) ? this.$store.state.token : localStorage.getItem('token') as string;
      // token = this.$store.state.token;
      return token;
    },
    restructuredProjects(): ProjectCategory[] {
      let tempCategory = '';
      let tempProjects: ProjectData[] = [];
      const projectCategories: ProjectCategory[] = []; // array to return

      // eslint-disable-next-line no-restricted-syntax
      for (const [index, projectParam] of this.projects.entries()) {
        const project: ProjectData = projectParam as ProjectData;

        if (tempCategory !== project.category) {
          // new category -> push previous
          if (index !== 0) {
            const projectCategory: ProjectCategory = {
              category: tempCategory,
              projects: tempProjects,
            };

            projectCategories.push(projectCategory);
            tempProjects = [];
          }

          tempCategory = project.category;
        }

        tempProjects.push(project);
      }
      // add last category
      projectCategories.push({
        category: tempCategory,
        projects: tempProjects,
      });

      tempProjects = [];
      tempCategory = '';

      return projectCategories;
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
      })
      .catch((error) => {
        console.log('catch view get');
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

  @media (max-width: 767.98px){
    margin-top:65px;
  }

  .intro__text{
    color: var(--color-text-light);
    font-size: 1.25rem;

    @media (max-width: 767.98px){
      font-size:1.05rem;
    }
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

  @media (max-width: 767.98px){
    margin-top: 60px;
    margin-bottom: 60px;
  }

  .copyright{
    font-size:90%;
    margin-top: 30px;
    color: var(--color-text-light);

    @media (max-width: 767.98px){
      margin-top: var(--grid-spacer);
    }
  }
}
</style>
