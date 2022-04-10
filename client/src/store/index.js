import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
  },
  mutations: {
    // 存储token
    SET_TOKEN(state, value) {
      state.token = value;
      sessionStorage.setItem("token", value);
    },
    // 清空token
    CLEAR_TOKEN(state) {
      state.token = "";
      sessionStorage.removeItem("token");
    },
  },
  actions: {},
  modules: {},
});
