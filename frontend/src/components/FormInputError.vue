<template>
  <span class="error text-error">{{ error }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormInputError',
  components: {},
  props: {
    error: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.error{
  font-size: .75rem;
   font-variation-settings: 'wght' 600;
}
</style>
