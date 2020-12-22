<template>
  <div class="link">
    <span class="link__label">{{ label }}:</span>
    <div class="link__text-tag-wrapper">
      <CustomLink :link="url" external>
        <template v-if="linkData.title">{{ linkData.title }}</template>
        <template v-else>{{ linkData.url }}</template>
      </CustomLink>
      <div class="tags">
        <span v-for="(item, index) in linkData.tags" :key="index" class="tag">
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CustomLink from '@/components/CustomLink.vue';

import { Link } from '../types/data-types';

export default defineComponent({
  name: 'TagLink',
  components: {
    CustomLink,
  },
  props: {
    callback: {
      type: Function as PropType<() => void>,
    },
    label: {
      type: String,
      required: true,
    },
    linkData: {
      type: Object as PropType<Link>,
      required: true,
      validator(projectData: Link) {
        return !!projectData.url;
      },
    },
  },
  computed: {
    url(): string {
      if (!this.linkData.title) {
        return `https://${this.linkData.url}`;
      }

      return this.linkData.url;
    },
  },
});
</script>

<style scoped lang="scss">
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
</style>
