"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_wd_tab2 = common_vendor.resolveComponent("wd-tab");
  const _easycom_wd_tabs2 = common_vendor.resolveComponent("wd-tabs");
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_cell_group2 = common_vendor.resolveComponent("wd-cell-group");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_form2 = common_vendor.resolveComponent("wd-form");
  (_easycom_wd_tab2 + _easycom_wd_tabs2 + _easycom_wd_input2 + _easycom_wd_cell_group2 + _easycom_wd_button2 + _easycom_wd_form2)();
}
const _easycom_wd_tab = () => "../../node-modules/wot-design-uni/components/wd-tab/wd-tab.js";
const _easycom_wd_tabs = () => "../../node-modules/wot-design-uni/components/wd-tabs/wd-tabs.js";
const _easycom_wd_input = () => "../../node-modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_cell_group = () => "../../node-modules/wot-design-uni/components/wd-cell-group/wd-cell-group.js";
const _easycom_wd_button = () => "../../node-modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_form = () => "../../node-modules/wot-design-uni/components/wd-form/wd-form.js";
if (!Math) {
  (_easycom_wd_tab + _easycom_wd_tabs + _easycom_wd_input + _easycom_wd_cell_group + _easycom_wd_button + _easycom_wd_form)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const formRef = common_vendor.ref(null);
    const activeTab = common_vendor.ref(0);
    const formData = common_vendor.reactive({
      username: "",
      password: "",
      confirmPassword: ""
    });
    const rules = common_vendor.reactive({
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, max: 20, message: "用户名长度应为3-20个字符", trigger: "blur" }
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 20, message: "密码长度应为6-20个字符", trigger: "blur" }
      ],
      confirmPassword: [
        { required: true, message: "请再次输入密码", trigger: "blur" },
        {
          validator: (rule, value, callback) => {
            if (value !== formData.password) {
              callback(new Error("两次输入的密码不一致"));
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      ]
    });
    const handleSubmit = () => {
      const validateFields = activeTab.value === 0 ? ["username", "password"] : ["username", "password", "confirmPassword"];
      formRef.value.validate(validateFields).then((valid) => {
        if (valid) {
          if (activeTab.value === 0) {
            common_vendor.index.showToast({
              title: "登录成功",
              icon: "success"
            });
            common_vendor.index.navigateTo({
              url: "/pages/bus/index"
            });
          } else {
            common_vendor.index.showToast({
              title: "注册成功",
              icon: "success"
            });
          }
        }
      }).catch((error) => {
        common_vendor.index.__f__("log", "at pages/auth/index.vue:144", "表单校验失败", error);
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: common_vendor.p({
          title: "登录"
        }),
        c: common_vendor.p({
          title: "注册"
        }),
        d: common_vendor.o(($event) => activeTab.value = $event),
        e: common_vendor.p({
          modelValue: activeTab.value
        }),
        f: common_vendor.o(($event) => formData.username = $event),
        g: common_vendor.p({
          name: "username",
          label: "用户名",
          placeholder: "请输入用户名",
          clearable: true,
          ["suffix-icon"]: "ri-user-line",
          modelValue: formData.username
        }),
        h: common_vendor.o(($event) => formData.password = $event),
        i: common_vendor.p({
          name: "password",
          label: "密码",
          placeholder: "请输入密码",
          clearable: true,
          ["suffix-icon"]: "ri-lock-line",
          ["show-password"]: true,
          type: "password",
          modelValue: formData.password
        }),
        j: activeTab.value === 1
      }, activeTab.value === 1 ? {
        k: common_vendor.o(($event) => formData.confirmPassword = $event),
        l: common_vendor.p({
          name: "confirmPassword",
          label: "确认密码",
          placeholder: "请再次输入密码",
          clearable: true,
          ["suffix-icon"]: "ri-lock-line",
          ["show-password"]: true,
          type: "password",
          modelValue: formData.confirmPassword
        })
      } : {}, {
        m: common_vendor.t(activeTab.value === 0 ? "登录" : "注册"),
        n: common_vendor.o(handleSubmit),
        o: common_vendor.p({
          type: "primary",
          block: true
        }),
        p: common_vendor.sr(formRef, "3f748249-3", {
          "k": "formRef"
        }),
        q: common_vendor.p({
          model: formData,
          rules,
          ["validate-trigger"]: ["onBlur"]
        }),
        r: activeTab.value === 0
      }, activeTab.value === 0 ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3f748249"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/auth/index.js.map
