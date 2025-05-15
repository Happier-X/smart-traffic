"use strict";
const common_vendor = require("../common/vendor.js");
const TOKEN_KEY = "token";
const BASE_URL = "http://localhost:3005/api";
const REQUEST_TIMEOUT = 15e3;
const LOADING_DELAY = 50;
let loadingTimer;
function getURL(url) {
  if (!/https|http/.test(url)) {
    return url.startsWith("/") ? `${BASE_URL}${url}` : `${BASE_URL}/${url}`;
  }
  return url;
}
function requestInterceptor(config) {
  const token = common_vendor.index.getStorageSync(TOKEN_KEY);
  if (token) {
    config.header.Authorization = `Bearer ${token}`;
  }
  return config;
}
function responseInterceptor(response) {
  if (response.statusCode === 401) {
    common_vendor.index.removeStorageSync(TOKEN_KEY);
    common_vendor.index.showToast({
      title: "登录过期，请重新登录",
      icon: "none"
    });
    common_vendor.index.navigateTo({
      url: "/pages/auth/index"
    });
  }
  return response;
}
function request(options) {
  return new Promise((resolve, reject) => {
    let config = {
      ...options,
      url: getURL(options.url),
      timeout: REQUEST_TIMEOUT,
      header: {
        "Content-Type": "application/json",
        ...options.header
      }
    };
    config = requestInterceptor(config);
    loadingTimer = setTimeout(() => {
      common_vendor.index.showLoading({
        title: "加载中"
      });
    }, LOADING_DELAY);
    common_vendor.index.request({
      ...config,
      success: (res) => {
        clearTimeout(loadingTimer);
        common_vendor.index.hideLoading();
        const response = responseInterceptor(res);
        if (!response)
          return;
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          const error = new Error(res.data.message || "请求失败");
          error.response = res;
          error.status = res.statusCode;
          reject(error);
          common_vendor.index.showToast({
            title: res.data.message || "请求失败",
            icon: "none"
          });
        }
      },
      fail: (err) => {
        clearTimeout(loadingTimer);
        common_vendor.index.hideLoading();
        const error = new Error(err.errMsg || "网络错误");
        error.original = err;
        reject(error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      },
      complete: () => {
        clearTimeout(loadingTimer);
      }
    });
  });
}
const get = (params) => {
  return request({ ...params, method: "GET" });
};
const post = (params) => {
  return request({ ...params, method: "POST" });
};
exports.get = get;
exports.post = post;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
