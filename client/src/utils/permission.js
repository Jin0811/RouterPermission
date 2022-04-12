/**
 * 路由权限控制
 */

let routesTree = [
  {
    id: "1",
    title: "课程管理",
    roles: ["admin", "teacher"],
    children: [
      {
        id: "1.1",
        title: "发布课程",
        roles: ["admin", "teacher"],
      },
      {
        id: "1.2",
        title: "查看工资",
        roles: ["admin", "teacher"],
      },
    ],
  },
  {
    id: "2",
    title: "学生管理",
    roles: ["admin", "student"],
    children: [
      {
        id: "2.1",
        title: "学习课程",
        roles: ["admin", "student"],
      },
      {
        id: "2.2",
        title: "查看校园卡",
        roles: ["admin", "student"],
      },
    ],
  },
];

/**
 * @name filterAsyncRoutes
 * @param {Array} routesTree
 * @param {String} currentRole
 * @returns {Array}
 * @description 根据路由表和角色，生成当前角色所拥有权限的路由
 */
function filterAsyncRoutes(routesTree, currentRole) {
  const res = [];
  routesTree.forEach((item) => {
    const temp = { ...item };
    let hasPermission = temp.roles.includes(currentRole);
    if (hasPermission) {
      if (temp.children) {
        temp.children = filterAsyncRoutes(temp.children);
      }
      res.push(temp);
    }
  });
  return res;
}

let result = filterAsyncRoutes(routesTree, "teacher");
console.log(result);
