/**
 * 路由权限控制
 */
import router from "@/router/index.js";
import store from "@/store/index.js";
import AllAsyncRoutes from "@/router/asyncRoutes.js";
import { getUserInfo } from "@/api/index.js";

// 路由导航守卫
router.beforeEach(async (to, from, next) => {
  let { asyncRoutes } = store.state;
  let token = sessionStorage.getItem("token");
  if (token) {
    // 拥有token，说明已经登录，无需重定向到登录页面
    // 如果有token，但是去往的是login页面，则不允许跳转
    if (to.path === "/login") {
      next({ path: from.path });
    }
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
 * @description temp.roles === "ALL" 时，表示当前路由，全部角色都可访问
 */
function filterAsyncRoutes(routesTree, currentRole) {
  const res = [];
  routesTree.forEach((item) => {
    const temp = { ...item };
    temp.meta = temp.meta || {};
    temp.meta.roles = temp.meta.roles || [];
    let hasPermission = temp.meta.roles.includes(currentRole);
    // 拥有权限 || 角色为admin || 当前路由的role === "all"
    if (hasPermission || currentRole === "admin" || temp.meta.roles === "all") {
      if (temp.children) {
        temp.children = filterAsyncRoutes(temp.children, currentRole);
      }
      res.push(temp);
    }
  });
  return res;
}
