import Vue from "vue";
import VueRouter from "vue-router";
import constantRoutes from "./constantRoutes";

Vue.use(VueRouter);

const routes = [...constantRoutes];
const router = new VueRouter({
  routes,
});

// 修复路由跳转时，正常跳转但是报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
