"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const utils_request = require("../utils/request.js");
function searchParkingLots(query) {
  return utils_request.get({
    url: "/parking/search",
    data: { query }
  });
}
function getNearbyParkingLots(latitude, longitude) {
  return utils_request.get({
    url: "/parking/nearby",
    data: { latitude, longitude }
  });
}
function getParkingLotById(id) {
  return utils_request.get({
    url: `/parking/${id}`
  });
}
exports.getNearbyParkingLots = getNearbyParkingLots;
exports.getParkingLotById = getParkingLotById;
exports.searchParkingLots = searchParkingLots;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/parking.js.map
