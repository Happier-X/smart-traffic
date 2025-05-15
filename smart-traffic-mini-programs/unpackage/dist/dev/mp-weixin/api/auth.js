"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const utils_request = require("../utils/request.js");
function login(data) {
  return utils_request.post({
    url: "/auth/login",
    data
  });
}
function register(data) {
  return utils_request.post({
    url: "/auth/register",
    data
  });
}
exports.login = login;
exports.register = register;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/auth.js.map
