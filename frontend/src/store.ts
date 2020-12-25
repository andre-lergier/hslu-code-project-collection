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
      localStorage.setItem('token', response.token);
      state.token = response.token;
      state.user = response.user;
    },

    logout(state: State): void {
      localStorage.removeItem('token');
      state.token = '';
      state.user = {};
    },
  },
});
