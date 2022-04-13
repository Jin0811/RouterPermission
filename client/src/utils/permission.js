/**
 * 路由权限控制
 */
import router from "@/router/index.js";
import store from "@/store/index.js";
import AllAsyncRoutes from "@/router/asyncRoutes.js";
import { getUserInfo } from "@/api/index.js";

// 路由导航守卫
router.beforeEach(async (to, from, next) => {
  let { token, asyncRoutes } = store.state;
  if (token) {
    // 拥有token，说明已经登录，无需重定向到登录页面
    // 判断是否拥有动态路由
    if (asyncRoutes && asyncRoutes.length > 0) {
      next();
    } else {
      // 动态路由不存在，使用token，请求后台接口，拿到当前用户的权限标识，生成当前用户的动态路由表
      const result = await getUserInfo();
      const currentAsyncRoutes = filterAsyncRoutes(AllAsyncRoutes, result.role);
      store.commit("SET_ASYNCROUTES", currentAsyncRoutes);
      router.addRoutes(currentAsyncRoutes);
      next({ ...to });
    }
  } else {
    // token不存在，直接跳转到登录页面
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  }
});

/**
 * @name filterAsyncRoutes
 * @param {Array} routesTree
 * @param {String} currentRole
 * @returns {Array}
 * @description 根据路由表和角色，生成当前角色所拥有权限的路由，
 * @description role === admin 时拥有全部权限
 */
function filterAsyncRoutes(routesTree, currentRole) {
  const res = [];
  routesTree.forEach((item) => {
    const temp = { ...item };
    temp.roles = temp.roles || [];
    let hasPermission = temp.roles.includes(currentRole);
    if (hasPermission || currentRole === "admin") {
      if (temp.children) {
        temp.children = filterAsyncRoutes(temp.children, currentRole);
      }
      res.push(temp);
    }
  });
  return res;
}
