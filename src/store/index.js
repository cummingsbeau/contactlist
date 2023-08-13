import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      isLogged: false,
    };
  },
  mutations: {
    afterLogin(state) {
      state.isLogged = true;
    },
    afterLogout(state) {
      state.isLogged = false;
    },
  },
});
