"use strict";
const common_vendor = require("../../../../common/vendor.js");
const __default__ = {
  name: "wd-icon",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: common_vendor.iconProps,
  emits: ["click", "touch"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isImage = common_vendor.computed(() => {
      return common_vendor.isDef(props.name) && common_vendor.isImageUrl(props.name);
    });
    const rootClass = common_vendor.computed(() => {
      const prefix = props.classPrefix;
      return `${prefix} ${props.customClass} ${isImage.value ? "wd-icon--image" : prefix + "-" + props.name}`;
    });
    const rootStyle = common_vendor.computed(() => {
      const style = {};
      if (props.color) {
        style["color"] = props.color;
      }
      if (props.size) {
        style["font-size"] = common_vendor.addUnit(props.size);
      }
      return `${common_vendor.objToStyle(style)}; ${props.customStyle}`;
    });
    function handleClick(event) {
      emit("click", event);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isImage.value
      }, isImage.value ? {
        b: _ctx.name
      } : {}, {
        c: common_vendor.o(handleClick),
        d: common_vendor.n(rootClass.value),
        e: common_vendor.s(rootStyle.value)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d4a8410a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/node-modules/wot-design-uni/components/wd-icon/wd-icon.js.map
