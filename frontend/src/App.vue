<template>
  <the-navigation />
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheNavigation from '@/components/TheNavigation.vue';

export default defineComponent({
  name: 'App',
  components: {
    TheNavigation,
  },
});
</script>

<style lang="scss">
@import 'style/main.scss';
</style>
