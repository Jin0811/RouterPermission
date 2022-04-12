import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/layout",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/layout",
    name: "Layout",
    component: () => import("../views/Layout.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
