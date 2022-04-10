module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        ws: true,
        changeOrigin: true, // 将选项changeOrigin设置true为基于名称的虚拟托管站点
      },
    },
  },
};
