<template>
  <view class="auth-container">
    <view class="logo-container">
      <image class="logo" src="/static/logo.svg" mode="aspectFit"></image>
      <text class="title">智慧交通</text>
    </view>

    <wd-tabs v-model="activeTab" style="margin-bottom: 20px">
      <wd-tab title="登录"></wd-tab>
      <wd-tab title="注册"></wd-tab>
    </wd-tabs>

    <wd-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :validate-trigger="['onBlur']"
    >
      <wd-cell-group>
        <wd-input
          v-model="formData.username"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          clearable
          suffix-icon="ri-user-line"
        />

        <wd-input
          v-model="formData.password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          clearable
          suffix-icon="ri-lock-line"
          show-password
          type="password"
        />

        <!-- 使用一个固定高度的容器来包裹确认密码输入框 -->
        <view class="confirm-password-container">
          <wd-input
            v-if="activeTab === 1"
            v-model="formData.confirmPassword"
            name="confirmPassword"
            label="确认密码"
            placeholder="请再次输入密码"
            clearable
            suffix-icon="ri-lock-line"
            show-password
            type="password"
          />
        </view>
      </wd-cell-group>

      <view style="margin: 30rpx 0">
        <wd-button type="primary" block @click="handleSubmit">
          {{ activeTab === 0 ? "登录" : "注册" }}
        </wd-button>
      </view>
    </wd-form>

    <view class="footer-tips">
      <text v-if="activeTab === 0">还没有账号？点击上方"注册"</text>
      <text v-else>已有账号？点击上方"登录"</text>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";

// 表单引用
const formRef = ref(null);

// 当前激活的标签页（0: 登录, 1: 注册）
const activeTab = ref(0);

// 表单数据
const formData = reactive({
  username: "",
  password: "",
  confirmPassword: "",
});

// 表单校验规则
const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "用户名长度应为3-20个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度应为6-20个字符", trigger: "blur" },
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
      trigger: "blur",
    },
  ],
});

// 提交表单
const handleSubmit = () => {
  // 根据当前标签页过滤要验证的字段
  const validateFields =
    activeTab.value === 0
      ? ["username", "password"]
      : ["username", "password", "confirmPassword"];

  formRef.value
    .validate(validateFields)
    .then((valid) => {
      if (valid) {
        if (activeTab.value === 0) {
          // 登录逻辑
          uni.showToast({
            title: "登录成功",
            icon: "success",
          });
          // TODO: 调用登录API
          uni.navigateTo({
            url: "/pages/bus/index",
          });
        } else {
          // 注册逻辑
          uni.showToast({
            title: "注册成功",
            icon: "success",
          });
          // TODO: 调用注册API
        }
      }
    })
    .catch((error) => {
      console.log("表单校验失败", error);
    });
};
</script>

<style scoped>
.auth-container {
  padding: 40rpx;
  display: flex;
  flex-direction: column;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30rpx 0 60rpx;
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 20rpx;
  border-radius: 20rpx;
  transition: transform 0.3s ease;
}

.logo:active {
  transform: scale(1.05);
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
}

.footer-tips {
  margin-top: 40rpx;
  text-align: center;
  color: #999;
  font-size: 26rpx;
}

.confirm-password-container {
  min-height: 90rpx; /* 设置与其他输入框相同的高度 */
}
</style>
