<template>
  <article class="project-card">
    <div class="project-card__header">
      <div class="project-card__title">
        <h3>{{ projectData.title }}</h3>
        <span v-if="projectData.private" class="private-indicator">
          <font-awesome-icon class="inline-icon" :icon="['fal', 'lock']" /> Private
        </span>
      </div>
      <span class="year" v-if="projectData.year">{{ projectData.year }}</span>
    </div>

    <div class="project-card__repository">
      <font-awesome-icon class="inline-icon" :icon="['fab', platformIcon]" />
       <CustomLink :link="projectData.repository.url" title="Repository anzeigen" external>
        {{ projectData.repository.name }}
       </CustomLink>
    </div>

    <div class="project-card__links">
      <div class="link">
        <span class="link__label">Prod</span>
        <CustomLink :link="projectData.publicLink.url">{{ projectData.publicLink.url }}</CustomLink>
        <div class="tags">
          <span v-for="(item, index) in projectData.publicLink.tags" :key="index">{{ item }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CustomLink from '@/components/CustomLink.vue';

import { ProjectData } from '../data-types';

export default defineComponent({
  name: 'ProjectCard',
  components: {
    CustomLink,
  },
  props: {
    callback: {
      type: Function as PropType<() => void>,
    },
    projectData: {
      type: Object as PropType<ProjectData>,
      required: true,
      validator(projectData: ProjectData) {
        return !!projectData.title;
      },
    },
  },
  computed: {
    platformIcon(): string {
      return this.projectData.repository.platform.toLowerCase();
    },
  },
});
</script>

<style scoped lang="scss">
.project-card{
  background:white;
  border-radius:8px;
  margin-bottom:25px;
  padding:18px;

  .project-card__header{
    display: flex;
    justify-content: space-between;

    .project-card__title{
      display:flex;
      flex-direction: column;
    }

    h3{
      font-size:1.125rem;
    }

    .private-indicator{
      font-size:.9rem;
      color: var(--color-text-light);
    }
  }

  .project-card__repository{
  }

  .project-card__links{
    .link{
      display:flex;
    }

    .link__label{
      font-variation-settings: 'wght' 600;
    }
  }
}
</style>
