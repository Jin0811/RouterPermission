<template>
  <div class="login">
    <div class="login-form">
      <el-form label-width="80px" :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            show-password
            type="password"
          ></el-input>
        </el-form-item>
        <div class="tips">
          <div>user1 -> 管理员admin：拥有全部权限</div>
          <div>user2 -> 教师teacher：课程管理，发布课程、删除课程</div>
          <div>user3 -> 学生student：学生管理，学习课程、跑步打卡</div>
        </div>
        <div class="btns">
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/index";
export default {
  name: "Login",
  data() {
    return {
      form: {
        userName: "user1",
        password: "123456",
      },
    };
  },
  methods: {
    // 登录
    handleLogin() {
      login(this.form).then((res) => {
        if (res && res.token) {
          this.$store.commit("SET_TOKEN", res.token); // 存储token
          this.$router.push("/layout"); // 跳转路由，在路由钩子当中进行动态路由的添加和生成
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .login-form {
    margin-top: 220px;
    width: 600px;
    padding: 35px 30px 30px;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .tips {
    margin-bottom: 15px;
    span {
      font-size: 14px;
      margin-right: 10px;
      color: #575757;
    }
  }
  .btns {
    text-align: center;
    .el-button {
      width: 50%;
    }
  }
}
</style>
