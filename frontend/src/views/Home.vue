<template>
  <div class="home">
    <section class="intro">
      <div class="container">
        <Title :title="title" :subtitle="subtitle" />
        <p class="intro__text">
          {{ introduction }}
        </p>
      </div>
    </section>

    <section class="projects">
      <section class="projects__title">
        <div class="container">
          <h2>Lergier Design</h2>
        </div>
      </section>
      <section class="projects__section">
        <div class="container">
          <project-card v-for="(item, index) in projects" :key="index" :project-data="item"/>
        </div>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Title from '@/components/Title.vue';
import ProjectCard from '@/components/ProjectCard.vue';

import { ProjectData, Link, HighlightedTitle } from '../data-types';

export default defineComponent({
  name: 'Home',
  components: {
    Title,
    ProjectCard,
  },
  data() {
    return {
      title: {
        highlighted: 'Code',
        append: 'Projects',
      } as HighlightedTitle,
      subtitle: 'by André Lergier | lergier.ch',
      introduction: 'It’s hard to keep track of all code projects stored on different plattforms, published under several subdomains, or deployed on various hostings. This overview is the solution for this problem and meakes it easy to find all code projects with their associated repository and links. To see private projects it’s madatory to be logged in.',
      projects: [
        {
          title: 'Fuchs + Partner Treuhand AG',
          year: 2020,
          private: true,
          publicLink: {
            url: 'fuchspartner.ch',
            tags: ['Xmedia ag'],
          } as Link,
          devLink: {
            url: 'fuchspartner.dev.lergier.ch',
            tags: ['Netlify'],
          } as Link,
          repository: {
            platform: 'GitHub',
            name: 'andre-lergier/fuchs-partner',
            url: 'https://github.com/andre-lergier/fuchs-partner',
          },
        } as ProjectData,
        {
          title: 'wegmüller | briggen architektur ag',
          year: 2020,
          private: true,
          publicLink: {
            url: 'wb-architektur.ch',
            tags: ['Hoststar'],
          } as Link,
          devLink: {
            url: 'wb-architektur.dev.lergier.ch',
            tags: ['Netlify'],
          } as Link,
          repository: {
            platform: 'Bitbucket',
            name: 'andrelergier/wegmueller_briggen',
            url: 'https://bitbucket.org/andrelergier/wegmueller_briggen',
          },
        } as ProjectData,
      ],
    };
  },
  mounted() {
    const test = 5;
    console.log(test);
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
    margin-top:50px;
    margin-bottom:15px;
  }

  .projects__section{
    background: var(--color-gray-light);
  }
}
</style>
