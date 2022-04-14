/**
 * 动态路由，需要登录，登录之后拿到当前用户的权限，再进行筛选
 *
 * 权限配置规则：
 * 1、admin用户无需配置权限，当 role === "admin" 时，拥有全部权限
 * 2、配置单一角色权限：roles: ["teacher"] 表示当前路由只有角色为teacher时才能访问（虽然admin没有配置，但仍拥有此权限）
 * 3、配置多个角色权限：roles: ["teacher", "student"] 表示teacher、student角色都可以访问此路由（虽然admin没有配置，但仍拥有此权限）
 * 4、配置全部角色都可以访问的路由（404页面等）：roles: "all"
 */

const asyncRoutes = [
  {
    path: "/layout",
    name: "Layout",
    roles: ["teacher", "student"], // 此路由可以被admin、teacher、student访问
    component: () => import("../views/Layout.vue"),
    children: [
      {
        path: "/course",
        name: "Course",
        title: "课程管理",
        roles: ["teacher"], // 此路由只能被admin、teacher访问
        component: () => import("../views/RouterContainer.vue"),
        children: [
          {
            path: "/course/publishCourse",
            name: "PublishCourse",
            title: "发布课程",
            roles: ["teacher"],
            component: () => import("../views/course/publishCourse.vue"),
          },
          // 有的时候，我们需要一个路由，但是并不需要这个路由出现在菜单当中，可以使用 hidden 属性来配置此路由在菜单中隐藏
          {
            path: "/course/courseDetail",
            name: "CourseDetail",
            title: "课程详情",
            hidden: true, // 在菜单当中隐藏此路由
            meta: {
              activeMenu: "/course/publishCourse",
            },
            roles: ["teacher"],
            component: () => import("../views/course/courseDetail.vue"),
          },
          {
            path: "/course/deleteCourse",
            name: "DeleteCourse",
            title: "删除课程",
            roles: ["teacher"],
            component: () => import("../views/course/deleteCourse.vue"),
          },
        ],
      },
      {
        path: "/student",
        name: "Student",
        title: "学生管理",
        roles: ["student"],
        component: () => import("../views/RouterContainer.vue"),
        children: [
          {
            path: "/student/learnCourse",
            name: "LearnCourse",
            title: "学习课程",
            roles: ["student"],
            component: () => import("../views/student/learnCourse.vue"),
          },
          {
            path: "/student/signIn",
            name: "SignIn",
            title: "跑步打卡",
            roles: ["student"],
            component: () => import("../views/student/signIn.vue"),
          },
        ],
      },
      {
        path: "/system",
        name: "System",
        title: "系统管理",
        component: () => import("../views/system/system.vue"),
      },
    ],
  },
  {
    path: "*",
    name: "NotFound",
    title: "404",
    roles: "all", // all代表此路由可以被全部用户访问
    component: () => import("../views/NotFound.vue"),
  },
];

export default asyncRoutes;
