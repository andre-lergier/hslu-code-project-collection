import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

import { State } from '@/types/data-types';

declare module '@vue/runtime-core' {
  // Declare your own store states
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
