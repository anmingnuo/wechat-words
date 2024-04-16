<route lang="json5">
{
  style: {
    navigationBarTitleText: '生词本',
  },
}
</route>

<template>
  <view class="bg-white overflow-hidden pt-2 px-8 main-box">
    <view class="card-box">
      <view class="item" v-for="(item, index) in arr">
        <view class="left">{{ item.name }}</view>
        <view class="right">{{ item.meaning }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
// import avatar from './components/avatar.vue'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const arr = ref([
  {
    id: 1,
    name: 'well',
    meaning: '井',
  },
  {
    id: 1,
    name: 'well',
    meaning: '井',
  },
  {
    id: 1,
    name: 'well',
    meaning: '井',
  },
  {
    id: 1,
    name: 'well',
    meaning: '井',
  },
])
const keyword = ref('')
const handleChange = (event) => {
  console.log(event)
  console.log(keyword.value)
}
</script>
<style lang="scss" scoped>
.main-box {
  flex: 1;
  background-color: #f5f5f5;
}

.card-box {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  .input-box {
    width: 100%;
    height: 100rpx;
    margin-bottom: 20rpx;
  }

  .item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 120rpx;
    padding: 0 40rpx;

    .left {
      font-size: 34rpx;
      color: #525252;
    }

    .right {
      margin-left: 40rpx;
      font-size: 34rpx;
      color: #525252;
    }
  }
}
</style>
