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
      common_vendor.index.__f__("log", "at pages/bus/index.vue:72", height2);
    };
    const userLongitude = common_vendor.ref("116.95");
    const userLatitude = common_vendor.ref("35.59");
    const markers = common_vendor.ref([]);
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
      // {
      //   number: "32路",
      //   startStation: "南山区",
      //   endStation: "科技园",
      //   startTime: "06:30",
      //   endTime: "21:30",
      //   price: "2.00",
      // },
      // {
      //   number: "301路",
      //   startStation: "机场",
      //   endStation: "市中心",
      //   startTime: "05:00",
      //   endTime: "24:00",
      //   price: "3.50",
      // },
    ]);
    const historySearches = common_vendor.ref(["1路", "地铁2号线", "301路快线"]);
    const searchBus = () => {
      if (!searchText.value.trim())
        return;
      common_vendor.index.__f__("log", "at pages/bus/index.vue:121", "搜索:", searchText.value);
      if (!historySearches.value.includes(searchText.value)) {
        historySearches.value.unshift(searchText.value);
        if (historySearches.value.length > 10) {
          historySearches.value.pop();
        }
      }
      searchText.value = "";
    };
    const selectRoute = (route) => {
      common_vendor.index.__f__("log", "at pages/bus/index.vue:135", "选择线路:", route);
    };
    const useHistory = (text) => {
      searchText.value = text;
      searchBus();
    };
    const removeHistory = (index) => {
      historySearches.value.splice(index, 1);
    };
    common_vendor.onLoad(() => {
      windowHeight.value = common_vendor.index.getSystemInfoSync().windowHeight;
      anchors.value = [
        100,
        Math.round(0.4 * windowHeight.value),
        Math.round(0.7 * windowHeight.value)
      ];
      height.value = anchors.value[1];
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userLatitude.value,
        b: userLongitude.value,
        c: markers.value,
        d: searchText.value,
        e: common_vendor.o(($event) => searchText.value = $event.detail.value),
        f: common_vendor.o(searchBus),
        g: busRoutes.value.length > 0
      }, busRoutes.value.length > 0 ? {
        h: common_vendor.f(busRoutes.value, (route, index, i0) => {
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
        i: common_vendor.f(historySearches.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => removeHistory(index), index),
            c: index,
            d: common_vendor.o(($event) => useHistory(item), index)
          };
        }),
        j: historySearches.value.length === 0
      }, historySearches.value.length === 0 ? {} : {}), {
        k: common_vendor.o(handleHeightChange),
        l: common_vendor.o(($event) => height.value = $event),
        m: common_vendor.p({
          anchors: anchors.value,
          height: height.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c29e4b4b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/bus/index.js.map
