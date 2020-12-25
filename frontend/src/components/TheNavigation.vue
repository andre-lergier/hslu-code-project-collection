<template>
  <div class="container">
    <nav>
      <ul>
        <li v-if="$route.path != '/'">
          <router-link to="/">
            <span class="logo">Code Projects</span>
          </router-link>
        </li>
        <li v-else-if="isAuth">
          <p class="username">
            Hi <span class="name">{{ username }}</span>
          </p>
        </li>
      </ul>

      <ul v-if="!isAuth">
        <li>
          <a href="https://lergier.ch/?ref=code" target="_blank">lergier.ch</a>
        </li>

        <li>
          <Button to="/login">Login</Button>
        </li>
      </ul>
      <ul v-else>
        <li>
          <a href="#" @click="logout">Logout</a>
        </li>
        <li>
          <Button to="/new-project" type="primary">New Project</Button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Button from '@/components/Button.vue';
import Auth from '@/modules/auth';
import { User } from '@/types/data-types';

export default defineComponent({
  name: 'TheNavigation',
  components: {
    Button,
  },
  computed: {
    token(): string {
      return this.$store.state.token;
    },
    isAuth(): boolean {
      return Auth.isAuthenticated();
    },
    user(): User {
      return this.$store.state.user as User;
    },
    username(): string {
      let username = '';
      if (this.user.name?.firstname) {
        username = `${this.user.name.firstname}`;
      } else {
        username = this.user.email;
      }
      return username;
    },
  },
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.go(0); // this.$router.currentRoute
    },
  },
});
</script>

<style scoped lang="scss">
.logo{
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 1.25rem;
  color: var(--color-text);
  margin-right: 25px;

  @media (max-width: 767.98px){
  font-size: 1.05rem;
  }
}
nav{
  display:flex;
  justify-content: space-between;
  align-items:center;

  ul{
    list-style-type: none;
    display:flex;
    align-items: center;
    justify-content: flex-end;
    padding:0;

    li{
      &:not(:last-of-type){
        margin-right:15px;
      }
    }
  }
}

.username{
  line-height: 1;
  font-size: 1rem;
  font-variation-settings: 'wght' 400;

  .name{
    // font-size: .8rem;
    font-variation-settings: 'wght' 600;
  }
}
</style>
