"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const utils_request = require("../utils/request.js");
function getAllBusRoutes() {
  return utils_request.get({
    url: "/bus"
  });
}
function searchBusRoutes(query) {
  return utils_request.get({
    url: "/bus/search",
    data: { query }
  });
}
function getBusSearchHistory() {
  return utils_request.get({
    url: "/bus/history"
  });
}
function getBusRouteById(id) {
  return utils_request.get({
    url: `/bus/${id}`
  });
}
exports.getAllBusRoutes = getAllBusRoutes;
exports.getBusRouteById = getBusRouteById;
exports.getBusSearchHistory = getBusSearchHistory;
exports.searchBusRoutes = searchBusRoutes;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/bus.js.map
