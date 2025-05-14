<template>
  <map
    style="width: 100vw; height: 100vh"
    :zIndex="10"
    :latitude="userLatitude"
    :longitude="userLongitude"
    :markers="markers"
    :show-location="true"
    @markertap="handleMarkerTap"
  ></map>
  <wd-floating-panel
    style="z-index: 100"
    v-model:height="height"
    :anchors="anchors"
    @heightChange="handleHeightChange"
  >
    <view class="search-tabs">
      <view
        class="tab-item"
        :class="{ active: activeTab === 'bus' }"
        @tap="switchTab('bus')"
      >
        公交查询
      </view>
      <view
        class="tab-item"
        :class="{ active: activeTab === 'parking' }"
        @tap="switchTab('parking')"
      >
        停车场
      </view>
    </view>

    <!-- 公交查询内容 -->
    <view class="bus-search-container" v-if="activeTab === 'bus'">
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

    <!-- 停车场查询内容 -->
    <view class="parking-search-container" v-if="activeTab === 'parking'">
      <view class="search-header">
        <view class="title">停车场查询</view>
        <view class="search-box">
          <input
            type="text"
            placeholder="搜索附近停车场"
            v-model="parkingSearchText"
          />
          <button class="search-btn" @tap="searchParking">搜索</button>
        </view>
      </view>

      <view class="parking-filter">
        <view class="filter-item active">全部</view>
        <view class="filter-item">距离最近</view>
        <view class="filter-item">空位最多</view>
        <view class="filter-item">价格最低</view>
      </view>

      <view class="parking-list">
        <view class="list-title">附近停车场</view>
        <view
          class="parking-item"
          v-for="(parking, index) in parkingLots"
          :key="index"
          @tap="selectParking(parking)"
        >
          <view class="parking-name">
            {{ parking.name }}
            <text class="parking-distance">{{ parking.distance }}</text>
          </view>
          <view
            class="parking-status"
            :class="{
              'status-free': parking.status === '空闲',
              'status-medium': parking.status === '适中',
              'status-busy': parking.status === '拥挤',
              'status-full': parking.status === '已满',
            }"
          >
            {{ parking.status }}
          </view>
          <view class="parking-info">
            <view class="parking-address">{{ parking.address }}</view>
          </view>
          <view class="parking-bottom-row">
            <view class="parking-spaces">
              <text class="available">可用: {{ parking.availableSpaces }}</text>
              /
              <text class="total">总共: {{ parking.totalSpaces }}</text>
            </view>
            <view class="parking-price">¥{{ parking.price }}/小时</view>
          </view>
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
const userLongitude = ref("116.95");
const userLatitude = ref("35.59");
const markers = ref([]);

// 添加标签切换相关数据
const activeTab = ref("bus");
// 公交查询相关数据
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

// 停车场相关数据
const parkingSearchText = ref("");
const parkingLots = ref([
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
    status: "空闲",
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
    status: "适中",
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
    status: "拥挤",
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
    status: "空闲",
  },
]);

// 切换标签
const switchTab = (tab) => {
  activeTab.value = tab;

  // 切换标签时更新地图标记
  if (tab === "parking") {
    updateParkingMarkers();
  } else {
    // 切回公交时清除停车场标记
    markers.value = [];
  }
};

// 停车场查询相关方法
const searchParking = () => {
  if (!parkingSearchText.value.trim()) return;
  // 模拟搜索功能，实际项目中应调用API
  console.log("搜索停车场:", parkingSearchText.value);
  // 简单模拟：根据输入筛选停车场
  const filteredParkingLots = parkingLots.value.filter(
    (p) =>
      p.name.includes(parkingSearchText.value) ||
      p.address.includes(parkingSearchText.value)
  );

  // 更新地图标记只显示筛选后的停车场
  updateParkingMarkers(filteredParkingLots);
};

// 选择停车场
const selectParking = (parking) => {
  console.log("选择停车场:", parking);

  // 将地图中心移动到选中的停车场
  userLatitude.value = parking.latitude;
  userLongitude.value = parking.longitude;

  // 更新标记，突出显示选中的停车场
  updateParkingMarkers([parking]);
};

// 更新地图上的停车场标记
const updateParkingMarkers = (lots = parkingLots.value) => {
  markers.value = lots.map((lot, index) => ({
    id: lot.id,
    latitude: lot.latitude,
    longitude: lot.longitude,
    title: lot.name,
    iconPath: "/static/parking_marker.png", // 假设已有停车场图标
    width: 30,
    height: 30,
    callout: {
      content: `${lot.name}\n可用:${lot.availableSpaces}/${lot.totalSpaces}`,
      color: "#000000",
      fontSize: 12,
      borderRadius: 5,
      bgColor: "#ffffff",
      padding: 5,
      display: "ALWAYS",
    },
  }));
};

// 处理地图标记点击事件
const handleMarkerTap = (e) => {
  const markerId = e.detail.markerId;
  const parking = parkingLots.value.find((p) => p.id === markerId);
  if (parking) {
    selectParking(parking);
  }
};

onLoad(() => {
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
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
  height: 100%;
}

.search-header {
  margin-bottom: 15px;
}

.title {
  font-size: 18px;
  font-weight: bold;
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
  text-align: center;
}

.empty-history {
  text-align: center;
  color: #999;
  padding: 30px 0;
  font-size: 14px;
}

/* 新增的样式 */
.search-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 10px;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  font-size: 15px;
  color: #666;
}

.tab-item.active {
  color: #2196f3;
  font-weight: bold;
  border-bottom: 2px solid #2196f3;
}

.parking-search-container {
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
  height: 100%;
}

.parking-filter {
  display: flex;
  overflow-x: auto;
  padding: 5px 0;
  margin-bottom: 10px;
}

.filter-item {
  flex-shrink: 0;
  margin-right: 10px;
  padding: 5px 12px;
  border-radius: 15px;
  background-color: #f5f5f5;
  color: #666;
  font-size: 13px;
}

.filter-item.active {
  background-color: #e3f2fd;
  color: #2196f3;
}

.parking-list {
  margin-top: 10px;
}

.parking-item {
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
  border-bottom: 1px solid #f0f0f0;
}

.parking-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.parking-distance {
  margin-left: 5px;
  color: #888;
  font-size: 12px;
}

.parking-status {
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 12px;
}

.status-free {
  color: #4caf50;
}

.status-medium {
  color: #ff9800;
}

.status-busy {
  color: #f44336;
}

.status-full {
  color: #9e9e9e;
}

.parking-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  flex-wrap: wrap;
}

.parking-address {
  color: #666;
  font-size: 13px;
  width: 100%;
  margin-bottom: 5px;
}

.parking-bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

.parking-spaces {
  font-size: 13px;
}

.parking-spaces .available {
  color: #4caf50;
  font-weight: bold;
}

.parking-spaces .total {
  color: #666;
}

.parking-price {
  color: #ff6b6b;
  font-weight: bold;
  font-size: 14px;
}
</style>
