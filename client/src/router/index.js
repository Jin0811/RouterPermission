import Vue from "vue";
import VueRouter from "vue-router";
import constantRoutes from "./constantRoutes";
import asyncRoutes from "./asyncRoutes";

Vue.use(VueRouter);

const routes = [...constantRoutes, ...asyncRoutes];
const router = new VueRouter({
  routes,
});

export default router;
