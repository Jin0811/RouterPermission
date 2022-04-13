import axios from "axios";
import { Message } from "element-ui";

// 创建axios实例
const service = axios.create({
  baseURL: "", // 开发环境下使用vueconfig.js进行代理
  timeout: 30000, // 请求超时时间
});

// 添加request拦截器(请求时，带上token)
service.interceptors.request.use(
  (config) => {
    // 添加token
    let token = sessionStorage.getItem("token");
    if (token) {
      config.headers["token"] = token;
    }
    // 时间戳, 解决IE缓存的问题
    if (config.method === "get") {
      config.params = {
        t: Date.parse(new Date()) / 1000,
        ...config.params,
      };
    } else if (config.method === "post") {
      config.headers.post["Content-Type"] = "application/json;charset=UTF-8";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // 请求错误处理
  }
);

// 添加respone拦截器在，这里的拦截器比较简陋，真实项目当中可根据需要增加功能
service.interceptors.response.use(
  (response) => {
    const res = response;
    switch (res.data.code) {
      // 请求成功，可以正常返回数据
      case 200:
        return res.data;

      // Token不存在，需要重新进行登陆
      case 401:
        console.log("token不存在");
        return res.data;

      default:
        break;
    }
  },
  (error) => {
    let message = "服务器错误，请稍后再试";
    Message({ message, type: "error", duration: 3000 });
    return Promise.reject(error); // 返回接口返回的错误信息
  }
);

export default service;
