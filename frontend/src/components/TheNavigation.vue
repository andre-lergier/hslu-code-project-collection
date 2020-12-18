<template>
  <div class="container">
    <nav>
      <ul>
        <li>
          <a href="https://lergier.ch/?ref=code" target="_blank">lergier.ch</a>
        </li>

        <li>
          <button>Log in</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Navigation',
});
</script>

<style scoped lang="scss">
nav{
  ul{
    list-style-type: none;
    display:flex;
    align-items: center;
    justify-content: flex-end;

    li{
      &:not(:last-of-type){
        margin-right:15px;
      }
    }
  }
}
</style>
