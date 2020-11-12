<template>
  <div class="home">
    <div class="container">
      <Title :title="title" :subtitle="subtitle" />
      <p class="intro__text">
        {{ introduction }}
      </p>
    </div>

    <section class="projects">
      <project-card v-for="(item, index) in projects" :key="index" :project-data="item"/>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Title from '@/components/Title.vue';
import ProjectCard from '@/components/ProjectCard.vue';

import { ProjectData, Link } from '@/assets/types';

export default defineComponent({
  name: 'Home',
  components: {
    Title,
    ProjectCard,
  },
  data() {
    return {
      title: 'Code Projects',
      subtitle: 'by André Lergier | lergier.ch',
      introduction: 'It’s hard to keep track of all code projects stored on different plattforms, published under several subdomains, or deployed on various hostings. This overview is the solution for this problem and meakes it easy to find all code projects with their associated repository and links. To see private projects it’s madatory to be logged in.',
      projects: [
        {
          title: 'Fuchs + Partner Treuhand AG',
          publicLink: {
            url: 'fuchspartner.ch',
            tags: ['Xmedia ag'],
          } as Link,
          devLink: {
            url: 'fuchspartner.dev.lergier.ch',
            tags: ['Netlify'],
          } as Link,
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
