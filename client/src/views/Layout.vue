<template>
  <el-container>
    <el-header>
      <p>Vue动态路由权限</p>
      <el-button type="primary" size="small" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="220px">
        <Menu></Menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "@/components/Menu/Menu";
export default {
  name: "Layout",
  components: {
    Menu,
  },
  methods: {
    // 退出登录
    logout() {},
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  color: #fff;
  background: #575757;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-main {
  padding: 15px;
}
</style>
