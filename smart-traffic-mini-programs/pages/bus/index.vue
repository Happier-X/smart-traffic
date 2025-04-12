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
  123
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
const userLongitude = ref(0);
const userLatitude = ref(0);
const markers = ref([]);
function getLocation() {
  uni.authorize({
    scope: "scope.userLocation",
    success() {
      uni.getLocation({
        type: "gcj02",
        success: (res) => {
          userLatitude.value = res.latitude;
          userLongitude.value = res.longitude;
        },
      });
    },
  });
}

onLoad(() => {
  getLocation();
  windowHeight.value = uni.getSystemInfoSync().windowHeight;
  anchors.value = [
    100,
    Math.round(0.4 * windowHeight.value),
    Math.round(0.7 * windowHeight.value),
  ];
  height.value = anchors.value[1];
});
</script>
<style scoped></style>
