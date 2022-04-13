import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "", // token
    asyncRoutes: [], // 动态路由
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
    // 存储动态路由
    SET_ASYNCROUTES(state, value) {
      state.asyncRoutes = value;
    },
    // 清空动态路由
    CLEAR_ASYNCROUTES(state) {
      state.asyncRoutes = [];
    },
  },
  actions: {},
  modules: {},
  getters: {
    menuData: (state) => {
      return state.asyncRoutes.length !== 0
        ? state.asyncRoutes[0].children
        : "";
    },
  },
});
