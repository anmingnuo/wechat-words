<route lang="json5">
{
  style: {
    navigationBarTitleText: '我的',
  },
}
</route>

<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <avatar></avatar>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import avatar from './components/avatar.vue'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>
<style lang="scss" scoped>
.desc {
  height: 80rpx;
}
</style>
