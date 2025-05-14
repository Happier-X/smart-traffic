import { get, post } from "@/utils/request";

/**
 * 获取所有公交路线
 */
export function getAllBusRoutes() {
  return get({
    url: "/bus",
  });
}

/**
 * 搜索公交路线
 * @param {string} query 搜索关键词
 */
export function searchBusRoutes(query) {
  return get({
    url: "/bus/search",
    data: { query },
  });
}

/**
 * 获取公交搜索历史
 */
export function getBusSearchHistory() {
  return get({
    url: "/bus/history",
  });
}

/**
 * 获取公交路线详情
 * @param {number} id 公交路线ID
 */
export function getBusRouteById(id) {
  return get({
    url: `/bus/${id}`,
  });
}
