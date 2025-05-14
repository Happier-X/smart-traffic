"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_wd_floating_panel2 = common_vendor.resolveComponent("wd-floating-panel");
  _easycom_wd_floating_panel2();
}
const _easycom_wd_floating_panel = () => "../../node-modules/wot-design-uni/components/wd-floating-panel/wd-floating-panel.js";
if (!Math) {
  _easycom_wd_floating_panel();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const height = common_vendor.ref(0);
    const windowHeight = common_vendor.ref(0);
    const anchors = common_vendor.ref([]);
    const handleHeightChange = ({ height: height2 }) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:149", height2);
    };
    const userLongitude = common_vendor.ref("116.95");
    const userLatitude = common_vendor.ref("35.59");
    const markers = common_vendor.ref([]);
    const activeTab = common_vendor.ref("bus");
    const searchText = common_vendor.ref("");
    const busRoutes = common_vendor.ref([
      {
        number: "1路",
        startStation: "火车站",
        endStation: "曲师大",
        startTime: "06:00",
        endTime: "22:00",
        price: "2.00"
      },
      {
        number: "2路",
        startStation: "曲师大",
        endStation: "高铁站",
        startTime: "05:30",
        endTime: "23:00",
        price: "2.00"
      }
    ]);
    const historySearches = common_vendor.ref(["1路", "地铁2号线", "301路快线"]);
    const searchBus = () => {
      if (!searchText.value.trim())
        return;
      "../../api/bus.js".then(({ searchBusRoutes }) => {
        searchBusRoutes(searchText.value).then((res) => {
          busRoutes.value = res;
          if (!historySearches.value.includes(searchText.value)) {
            historySearches.value.unshift(searchText.value);
            if (historySearches.value.length > 10) {
              historySearches.value.pop();
            }
          }
        }).catch((err) => {
          common_vendor.index.showToast({
            title: err.message || "搜索失败",
            icon: "none"
          });
        });
      });
    };
    const selectRoute = (route) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:204", "选择线路:", route);
      "../../api/bus.js".then(({ getBusRouteById }) => {
        getBusRouteById(route.id).then((routeDetail) => {
          common_vendor.index.__f__("log", "at pages/index/index.vue:209", "线路详情:", routeDetail);
        }).catch((err) => {
          common_vendor.index.__f__("error", "at pages/index/index.vue:213", "获取线路详情失败:", err);
        });
      });
    };
    const useHistory = (text) => {
      searchText.value = text;
      searchBus();
    };
    const removeHistory = (index) => {
      historySearches.value.splice(index, 1);
    };
    const parkingSearchText = common_vendor.ref("");
    const parkingLots = common_vendor.ref([
      {
        id: 1,
        name: "测试停车场1",
        address: "测试商业区A栋旁",
        latitude: 35.6,
        longitude: 116.97,
        availableSpaces: 45,
        totalSpaces: 120,
        price: "5.00",
        distance: "500m",
        status: "free"
      },
      {
        id: 2,
        name: "测试停车场2",
        address: "测试广场地下",
        latitude: 35.58,
        longitude: 116.93,
        availableSpaces: 32,
        totalSpaces: 200,
        price: "6.00",
        distance: "1.2km",
        status: "medium"
      },
      {
        id: 3,
        name: "商业街停车场",
        address: "步行街北门入口处",
        latitude: 35.61,
        longitude: 116.96,
        availableSpaces: 5,
        totalSpaces: 80,
        price: "8.00",
        distance: "800m",
        status: "busy"
      },
      {
        id: 4,
        name: "曲师大停车场",
        address: "曲师大南门对面",
        latitude: 35.57,
        longitude: 116.94,
        availableSpaces: 60,
        totalSpaces: 100,
        price: "3.00",
        distance: "300m",
        status: "free"
      }
    ]);
    const switchTab = (tab) => {
      activeTab.value = tab;
      if (tab === "parking") {
        updateParkingMarkers();
      } else {
        markers.value = [];
      }
    };
    const searchParking = () => {
      if (!parkingSearchText.value.trim())
        return;
      "../../api/parking.js".then(({ searchParkingLots }) => {
        searchParkingLots(parkingSearchText.value).then((res) => {
          parkingLots.value = res;
          updateParkingMarkers(parkingLots.value);
        }).catch((err) => {
          common_vendor.index.showToast({
            title: err.message || "搜索失败",
            icon: "none"
          });
        });
      });
    };
    const selectParking = (parking) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:314", "选择停车场:", parking);
      userLatitude.value = parking.latitude;
      userLongitude.value = parking.longitude;
      updateParkingMarkers([parking]);
      "../../api/parking.js".then(({ getParkingLotById }) => {
        getParkingLotById(parking.id).catch((err) => {
          common_vendor.index.__f__("error", "at pages/index/index.vue:327", "获取停车场详情失败:", err);
        });
      });
    };
    const updateParkingMarkers = (lots = parkingLots.value) => {
      markers.value = lots.map((lot, index) => ({
        id: lot.id,
        latitude: lot.latitude,
        longitude: lot.longitude,
        title: lot.name,
        iconPath: "/static/parking_marker.png",
        // 假设已有停车场图标
        width: 30,
        height: 30,
        callout: {
          content: `${lot.name}
可用:${lot.availableSpaces}/${lot.totalSpaces}`,
          color: "#000000",
          fontSize: 12,
          borderRadius: 5,
          bgColor: "#ffffff",
          padding: 5,
          display: "ALWAYS"
        }
      }));
    };
    const handleMarkerTap = (e) => {
      const markerId = e.detail.markerId;
      const parking = parkingLots.value.find((p) => p.id === markerId);
      if (parking) {
        selectParking(parking);
      }
    };
    const getStatusDisplayText = (status) => {
      const statusMap = {
        "free": "空闲",
        "medium": "适中",
        "busy": "拥挤",
        "full": "已满"
      };
      return statusMap[status] || status;
    };
    common_vendor.onLoad(() => {
      windowHeight.value = common_vendor.index.getSystemInfoSync().windowHeight;
      anchors.value = [
        100,
        Math.round(0.4 * windowHeight.value),
        Math.round(0.7 * windowHeight.value)
      ];
      height.value = anchors.value[1];
      "../../api/bus.js".then(({ getAllBusRoutes }) => {
        getAllBusRoutes().then((res) => {
          if (res && res.length > 0) {
            busRoutes.value = res;
          }
        }).catch((err) => {
          common_vendor.index.__f__("error", "at pages/index/index.vue:392", "获取公交路线失败:", err);
        });
      });
      "../../api/parking.js".then(({ getNearbyParkingLots }) => {
        getNearbyParkingLots(userLatitude.value, userLongitude.value).then((res) => {
          if (res && res.length > 0) {
            parkingLots.value = res;
          }
        }).catch((err) => {
          common_vendor.index.__f__("error", "at pages/index/index.vue:405", "获取附近停车场失败:", err);
        });
      });
      const token = common_vendor.index.getStorageSync("token");
      if (token) {
        "../../api/bus.js".then(({ getBusSearchHistory }) => {
          getBusSearchHistory().then((res) => {
            if (res && res.length > 0) {
              historySearches.value = res.map((item) => item.query);
            }
          }).catch((err) => {
            common_vendor.index.__f__("error", "at pages/index/index.vue:420", "获取搜索历史失败:", err);
          });
        });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userLatitude.value,
        b: userLongitude.value,
        c: markers.value,
        d: common_vendor.o(handleMarkerTap),
        e: activeTab.value === "bus" ? 1 : "",
        f: common_vendor.o(($event) => switchTab("bus")),
        g: activeTab.value === "parking" ? 1 : "",
        h: common_vendor.o(($event) => switchTab("parking")),
        i: activeTab.value === "bus"
      }, activeTab.value === "bus" ? common_vendor.e({
        j: searchText.value,
        k: common_vendor.o(($event) => searchText.value = $event.detail.value),
        l: common_vendor.o(searchBus),
        m: busRoutes.value.length > 0
      }, busRoutes.value.length > 0 ? {
        n: common_vendor.f(busRoutes.value, (route, index, i0) => {
          return {
            a: common_vendor.t(route.number),
            b: common_vendor.t(route.startStation),
            c: common_vendor.t(route.endStation),
            d: common_vendor.t(route.startTime),
            e: common_vendor.t(route.endTime),
            f: common_vendor.t(route.price),
            g: index,
            h: common_vendor.o(($event) => selectRoute(route), index)
          };
        })
      } : common_vendor.e({
        o: common_vendor.f(historySearches.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => removeHistory(index), index),
            c: index,
            d: common_vendor.o(($event) => useHistory(item), index)
          };
        }),
        p: historySearches.value.length === 0
      }, historySearches.value.length === 0 ? {} : {})) : {}, {
        q: activeTab.value === "parking"
      }, activeTab.value === "parking" ? {
        r: parkingSearchText.value,
        s: common_vendor.o(($event) => parkingSearchText.value = $event.detail.value),
        t: common_vendor.o(searchParking),
        v: common_vendor.f(parkingLots.value, (parking, index, i0) => {
          return {
            a: common_vendor.t(parking.name),
            b: common_vendor.t(parking.distance),
            c: common_vendor.t(getStatusDisplayText(parking.status)),
            d: parking.status === "free" ? 1 : "",
            e: parking.status === "medium" ? 1 : "",
            f: parking.status === "busy" ? 1 : "",
            g: parking.status === "full" ? 1 : "",
            h: common_vendor.t(parking.address),
            i: common_vendor.t(parking.availableSpaces),
            j: common_vendor.t(parking.totalSpaces),
            k: common_vendor.t(parking.price),
            l: index,
            m: common_vendor.o(($event) => selectParking(parking), index)
          };
        })
      } : {}, {
        w: common_vendor.o(handleHeightChange),
        x: common_vendor.o(($event) => height.value = $event),
        y: common_vendor.p({
          anchors: anchors.value,
          height: height.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
