<template>
  <map
    style="width: 100vw; height: 100vh"
    :zIndex="10"
    :latitude="userLatitude"
    :longitude="userLongitude"
    :markers="markers"
    :show-location="true"
  ></map>
  <wd-floating-panel
    style="z-index: 100"
    v-model:height="height"
    :anchors="anchors"
    @heightChange="handleHeightChange"
  >
    <view class="bus-search-container">
      <view class="search-header">
        <view class="title">公交查询</view>
        <view class="search-box">
          <input type="text" placeholder="搜索公交线路" v-model="searchText" />
          <button class="search-btn" @tap="searchBus">搜索</button>
        </view>
      </view>

      <view class="bus-list" v-if="busRoutes.length > 0">
        <view class="list-title">线路列表</view>
        <view
          class="bus-item"
          v-for="(route, index) in busRoutes"
          :key="index"
          @tap="selectRoute(route)"
        >
          <view class="bus-number">{{ route.number }}</view>
          <view class="bus-info">
            <view class="bus-route"
              >{{ route.startStation }} - {{ route.endStation }}</view
            >
            <view class="bus-time"
              >{{ route.startTime }} - {{ route.endTime }}</view
            >
          </view>
          <view class="bus-price">¥{{ route.price }}</view>
        </view>
      </view>

      <view class="history-search" v-else>
        <view class="list-title">历史查询</view>
        <view
          class="history-item"
          v-for="(item, index) in historySearches"
          :key="index"
          @tap="useHistory(item)"
        >
          <view class="history-text">{{ item }}</view>
          <view class="history-delete" @tap.stop="removeHistory(index)">×</view>
        </view>
        <view class="empty-history" v-if="historySearches.length === 0">
          暂无历史查询记录
        </view>
      </view>
    </view>
  </wd-floating-panel>
</template>
<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
const height = ref(0);
const windowHeight = ref(0);
const anchors = ref([]);

const handleHeightChange = ({ height }) => {
  console.log(height);
};
const userLongitude = ref('116.95');
const userLatitude = ref('35.59');
const markers = ref([]);

// 添加公交查询相关数据
const searchText = ref("");
const busRoutes = ref([
  {
    number: "1路",
    startStation: "火车站",
    endStation: "曲师大",
    startTime: "06:00",
    endTime: "22:00",
    price: "2.00",
  },
  {
    number: "2路",
    startStation: "曲师大",
    endStation: "高铁站",
    startTime: "05:30",
    endTime: "23:00",
    price: "2.00",
  },
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

const historySearches = ref(["1路", "地铁2号线", "301路快线"]);

// 公交查询相关方法
const searchBus = () => {
  if (!searchText.value.trim()) return;
  // 模拟搜索功能，实际项目中应调用API
  console.log("搜索:", searchText.value);

  // 添加到历史记录
  if (!historySearches.value.includes(searchText.value)) {
    historySearches.value.unshift(searchText.value);
    if (historySearches.value.length > 10) {
      historySearches.value.pop();
    }
  }

  searchText.value = "";
};

const selectRoute = (route) => {
  console.log("选择线路:", route);
  // 这里可以实现路线详情展示或在地图上显示路线
};

const useHistory = (text) => {
  searchText.value = text;
  searchBus();
};

const removeHistory = (index) => {
  historySearches.value.splice(index, 1);
};

// function getLocation() {
//   uni.authorize({
//     scope: "scope.userLocation",
//     success() {
//       uni.getLocation({
//         type: "gcj02",
//         success: (res) => {
//           userLatitude.value = res.latitude;
//           userLongitude.value = res.longitude;
//         },
//       });
//     },
//   });
// }

onLoad(() => {
  // getLocation();
  windowHeight.value = uni.getSystemInfoSync().windowHeight;
  anchors.value = [
    100,
    Math.round(0.4 * windowHeight.value),
    Math.round(0.7 * windowHeight.value),
  ];
  height.value = anchors.value[1];
});
</script>
<style scoped>
.bus-search-container {
  padding: 15px;
  box-sizing: border-box;
  height: 100%;
  background-color: #fff;
}

.search-header {
  margin-bottom: 15px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.search-box {
  display: flex;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.search-box input {
  flex: 1;
  height: 40px;
  padding: 0 10px;
  border: none;
}

.search-btn {
  width: 80px;
  height: 40px;
  background-color: #2196f3;
  color: white;
  border: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
}

.list-title {
  font-size: 16px;
  font-weight: bold;
  margin: 15px 0 10px 0;
  color: #333;
}

.bus-item {
  display: flex;
  padding: 15px 10px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
}

.bus-number {
  width: 60px;
  height: 30px;
  background-color: #2196f3;
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-weight: bold;
}

.bus-info {
  flex: 1;
}

.bus-route {
  font-size: 15px;
  margin-bottom: 5px;
}

.bus-time {
  font-size: 12px;
  color: #888;
}

.bus-price {
  color: #ff6b6b;
  font-weight: bold;
}

.history-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 5px;
  border-bottom: 1px solid #f0f0f0;
}

.history-text {
  color: #555;
}

.history-delete {
  width: 20px;
  height: 20px;
  color: #999;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-history {
  text-align: center;
  color: #999;
  padding: 30px 0;
  font-size: 14px;
}
</style>
