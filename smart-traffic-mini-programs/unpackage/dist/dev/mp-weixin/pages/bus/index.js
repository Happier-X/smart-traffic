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
      common_vendor.index.__f__("log", "at pages/bus/index.vue:25", height2);
    };
    const userLongitude = common_vendor.ref(0);
    const userLatitude = common_vendor.ref(0);
    const markers = common_vendor.ref([]);
    function getLocation() {
      common_vendor.index.authorize({
        scope: "scope.userLocation",
        success() {
          common_vendor.index.getLocation({
            type: "gcj02",
            success: (res) => {
              userLatitude.value = res.latitude;
              userLongitude.value = res.longitude;
              markers.value = [
                {
                  id: 0,
                  latitude: res.latitude,
                  longitude: res.longitude,
                  //   iconPath: "/static/location-icon.svg",
                  width: 50,
                  height: 50
                }
              ];
            }
          });
        }
      });
    }
    common_vendor.onLoad(() => {
      getLocation();
      windowHeight.value = common_vendor.index.getSystemInfoSync().windowHeight;
      anchors.value = [
        100,
        Math.round(0.4 * windowHeight.value),
        Math.round(0.7 * windowHeight.value)
      ];
      height.value = anchors.value[1];
    });
    return (_ctx, _cache) => {
      return {
        a: userLatitude.value,
        b: userLongitude.value,
        c: markers.value,
        d: common_vendor.o(handleHeightChange),
        e: common_vendor.o(($event) => height.value = $event),
        f: common_vendor.p({
          anchors: anchors.value,
          height: height.value
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/bus/index.js.map
