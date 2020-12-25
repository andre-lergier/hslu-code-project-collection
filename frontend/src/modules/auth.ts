import store from '@/store';

export default class Auth {
  static isAuthenticated(): boolean {
    let state = false;
    if (store.state.token) {
      state = true;
    }

    return state;
  }
}
