import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      token: '',
    };
  },
  mutations: {
    setToken(state: State, value): void {
      state.token = value;
    },
  },
});

interface State {
  token: string;
}
