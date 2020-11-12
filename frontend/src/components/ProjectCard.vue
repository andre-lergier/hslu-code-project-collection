<template>
  <article>
    {{ projectData.title }}
    <div class="links">
    <a href="projectData.publicLink.url">{{ projectData.publicLink.url }}</a>
      <div class="tags">
        <span v-for="(item, index) in projectData.publicLink.tags" :key="index">{{ item }}</span>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { ProjectData } from '@/assets/types';

export default defineComponent({
  name: 'ProjectCard',
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
});
</script>

<style scoped lang="scss">

</style>
