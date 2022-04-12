/**
 * 动态路由，需要登录，登录之后拿到当前用户的权限，再进行筛选
 */

const asyncRoutes = [
  {
    path: "/layout",
    name: "Layout",
    component: () => import("../views/Layout.vue"),
    children: [
      {
        path: "/course",
        name: "Course",
        title: "课程管理",
        component: () => import("../views/RouterContainer.vue"),
        children: [
          {
            path: "/course/publishCourse",
            name: "PublishCourse",
            title: "发布课程",
            component: () => import("../views/course/publishCourse.vue"),
          },
          {
            path: "/course/deleteCourse",
            name: "DeleteCourse",
            title: "删除课程",
            component: () => import("../views/course/deleteCourse.vue"),
          },
        ],
      },
      {
        path: "/student",
        name: "Student",
        title: "学生管理",
        component: () => import("../views/RouterContainer.vue"),
        children: [
          {
            path: "/student/learnCourse",
            name: "LearnCourse",
            title: "学习课程",
            component: () => import("../views/student/learnCourse.vue"),
          },
          {
            path: "/student/signIn",
            name: "SignIn",
            title: "跑步打卡",
            component: () => import("../views/student/signIn.vue"),
          },
        ],
      },
    ],
  },
];

export default asyncRoutes;
