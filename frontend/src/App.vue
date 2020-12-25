<template>
  <the-navigation />
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheNavigation from '@/components/TheNavigation.vue';

import api from '@/modules/api';

export default defineComponent({
  name: 'App',
  components: {
    TheNavigation,
  },
  beforeCreate() {
    if (localStorage.getItem('token')) {
      const lsToken = localStorage.getItem('token');

      api.get('/user', {
        headers: {
          Authorization: `Bearer ${lsToken}`,
        },
      })
        .then((response) => {
          this.$store.commit('setUser', {
            token: response.data.token,
            user: response.data.user,
          });

          console.log('user credentials found and saved');
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit('setUser', {
            token: '',
            user: '',
          });
        });
    }
  },
});
</script>

<style lang="scss">
@import 'style/main.scss';
</style>
