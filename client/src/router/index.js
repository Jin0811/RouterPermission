import Vue from "vue";
import VueRouter from "vue-router";
import constantRoutes from "./constantRoutes";

Vue.use(VueRouter);

const routes = [...constantRoutes];
const router = new VueRouter({
  routes,
});

export default router;
