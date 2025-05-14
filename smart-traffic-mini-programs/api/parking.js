import { get, post } from "@/utils/request";

/**
 * 获取所有停车场
 */
export function getAllParkingLots() {
  return get({
    url: "/parking",
  });
}

/**
 * 搜索停车场
 * @param {string} query 搜索关键词
 */
export function searchParkingLots(query) {
  return get({
    url: "/parking/search",
    data: { query },
  });
}

/**
 * 获取附近停车场
 * @param {string} latitude 纬度
 * @param {string} longitude 经度
 */
export function getNearbyParkingLots(latitude, longitude) {
  return get({
    url: "/parking/nearby",
    data: { latitude, longitude },
  });
}

/**
 * 获取停车场搜索历史
 */
export function getParkingSearchHistory() {
  return get({
    url: "/parking/history",
  });
}

/**
 * 获取停车场详情
 * @param {number} id 停车场ID
 */
export function getParkingLotById(id) {
  return get({
    url: `/parking/${id}`,
  });
}
