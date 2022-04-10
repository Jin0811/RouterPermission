import request from "@/utils/request";

// 登录
export function login(params) {
  return request({
    url: "/api/login",
    method: "get",
    params,
  });
}

// 获取用户信息
export function getUserInfo(params) {
  return request({
    url: "/api/getUserInfo",
    method: "get",
    params,
  });
}
