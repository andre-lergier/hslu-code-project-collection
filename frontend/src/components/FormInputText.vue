<template>
  <div class="form-group">
    <label :for="id">{{label}}</label>
    <div class="input-wrapper">
      <input
        :type="inputType"
        :id="id"
        class="form-element"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        @input="$emit('update:modelValue', $event.target.value)"
        :required="required"
      >

      <a href="#"
        v-if="type === 'password'"
        class="show-password-button"
        @click="showPassword = !showPassword"
      >
        <font-awesome-icon v-if="!showPassword" :icon="['fal', 'eye']"/>
        <font-awesome-icon v-else :icon="['fal', 'eye-slash']"/>
      </a>
    </div>

    <FormInputError :error="error" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import FormInputError from '@/components/FormInputError.vue';

export default defineComponent({
  name: 'FormInputText',
  components: {
    FormInputError,
  },
  props: {
    label: String,
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    autocomplete: {
      type: String,
      required: false,
      default: '',
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    modelValue: {
      type: String,
    },
    error: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: [
    'update:modelValue',
  ],
  data() {
    return {
      id: '',
      showPassword: false,
    };
  },
  computed: {
    inputType(): string {
      if (this.type === 'password') {
        if (this.showPassword) {
          return 'text';
        }
        return 'password';
      }
      return this.type;
    },
  },
  mounted() {
    this.id = `inputID-${this.uuidv4()}`;
  },
  methods: {
    // eslint-disable-next-line no-bitwise, no-mixed-operators
    uuidv4: (): string => (1e7 + -1e3 + -4e3 + -8e3 + -1e11).toString().replace(/[018]/g, (c: string): string => (parseInt(c, 2) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> parseInt(c, 2) / 4).toString(16)),
  },
});
</script>

<style lang="scss">
.form-group{
  margin-bottom: calc(var(--grid-spacer) + 5px);
}
</style>
<style lang="scss" scoped>
label{
  display: block;
  font-size:.85rem;
  font-variation-settings: 'wght' 500;
  margin-bottom: 3px;
}

input{
  display: block;
  width: 100%;
  padding: .65rem .95rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text);
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ccc;
  appearance: none;
  border-radius: .35rem;
  transition: all ease .3s;

  &:focus{
    border-color: #5a5a5a;
    outline: none;
  }
}

.input-wrapper{
  position:relative;
}

.show-password-button{
  display:block;
  font-size: 1.1rem;
  line-height:1;
  color: var(--color-text);
  position: absolute;
  z-index:1;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  opacity: .7;

  &:hover, &:focus{
    opacity: 1;
  }
}
</style>

<!--
Helpful Links:
- https://v3.vuejs.org/guide/component-basics.html#using-v-model-on-components
- https://v3.vuejs.org/guide/component-custom-events.html#handling-v-model-modifiers
-->
