<template>
  <div class="menu-container">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :default-active="defaultActive"
    >
      <template v-for="(item, index) in menuData">
        <template v-if="item.children && item.children.length > 0">
          <SubMenu :menuItem="item" :key="index"></SubMenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="index">
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
export default {
  name: "Menu",
  components: {
    SubMenu,
  },
  computed: {
    // 从store当中获取菜单
    menuData() {
      return this.$store.state.asyncRoutes[0].children;
    },
    // 当前激活的菜单项
    defaultActive() {
      return this.$route.path;
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.menu-container {
  height: 100%;
  .el-menu {
    height: 100%;
  }
}
</style>
