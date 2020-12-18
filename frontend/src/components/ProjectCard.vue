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

    <div class="project-card__repository" v-if="projectData.repository">
      <font-awesome-icon class="inline-icon" :icon="['fab', platformIcon]" />
       <CustomLink :link="projectData.repository.url" title="Repository anzeigen" external>
        {{ projectData.repository.name }}
       </CustomLink>
    </div>

    <div class="project-card__links">
      <tag-link v-if="projectData.publicLink" :linkData="projectData.publicLink" label="Prod" />
      <tag-link v-if="projectData.devLink" :linkData="projectData.devLink" label="Dev" />
      <tag-link v-if="projectData.database" :linkData="projectData.database" label="DB" />
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CustomLink from '@/components/CustomLink.vue';
import TagLink from '@/components/TagLink.vue';

import { ProjectData } from '../types/data-types';

export default defineComponent({
  name: 'ProjectCard',
  components: {
    CustomLink,
    TagLink,
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
      return this.projectData?.repository.platform.toLowerCase();
    },
  },
});
</script>

<style scoped lang="scss">
.project-card{
  background:white;
  border-radius:8px;
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
    margin-top: 15px;
  }

  .project-card__links{
    margin-top: 15px;

    .link{
      display:grid;
      grid-template-columns: 50px auto;

      .link__label{
        grid-column-start: 1;
        font-variation-settings: 'wght' 600;
      }

      .link__text-tag-wrapper{
        display:flex;
        grid-column-start: 2;
      }

      .tags{
        display:flex;
        align-items: center;
        margin-left:5px;

        .tag{
          font-size: .775rem;
          color: var(--color-gray);
          border: 1px solid var(--color-gray);
          border-radius:50px;
          line-height: 1;
          padding: 2px 7px;
          margin-left:5px;
        }
      }
    }
  }
}
</style>
