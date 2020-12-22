import { createStore } from 'vuex';

import { State } from '@/types/data-types';

export default createStore({
  state() {
    return {
      token: '',
      user: {},
    };
  },
  mutations: {
    setUser(state: State, response): void {
      state.token = response.token;
      state.user = response.user;
    },
  },
});
