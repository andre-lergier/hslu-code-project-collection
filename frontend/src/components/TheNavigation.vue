<template>
  <div class="container">
    <nav>
      <ul>
        <li>
          <router-link v-if="$route.path != '/'" to="/">
            <span class="logo">Code Projects</span>
          </router-link>
        </li>
      </ul>
      <ul>
        <li>
          <a href="https://lergier.ch/?ref=code" target="_blank">lergier.ch</a>
        </li>

        <li>
          <Button to="/login">Login</Button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/components/Button.vue';

export default defineComponent({
  name: 'TheNavigation',
  components: {
    Button,
  },
});
</script>

<style scoped lang="scss">
.logo{
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 1.25rem;
  color: var(--color-text);
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
</style>
