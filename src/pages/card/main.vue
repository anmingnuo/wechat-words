<route lang="json5">
{
  style: {
    navigationBarTitleText: '单词',
  },
}
</route>

<template>
  <view class="bg-white overflow-hidden pt-2 px-4 main-box">
    <view class="card-box">
      <view class="top">
        <view class="text">
          {{ char.name }}
          <!-- {{ char.name }} -->
        </view>
      </view>
      <view class="bottom">
        <view class="box true" @click="goTo('card')">认识</view>
        <view class="box" @click="goTo('card')">模糊</view>
        <view class="box" @click="goTo('card')">不认识</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import PLATFORM from '@/utils/platform'
// import avatar from './components/avatar.vue'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const char = ref({
  name: 'Hello World',
  type: 'text',
})
const goTo = (str) => {
  uni.navigateTo({
    url: `/pages/${str}/main`,
  })
}
onLoad((options) => {
  char.value.name += '1'
})
</script>
<style lang="scss" scoped>
.main-box {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.card-box {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70rpx;

  .top {
    width: 400rpx;
    height: 400rpx;
    line-height: 400rpx;
    text-align: center;

    .text {
      font-size: 50rpx;
      font-weight: bold;
      color: #333;

      ::after {
        color: #333;
        content: '1111111';
      }
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 500rpx;
    height: 400rpx;
    margin-top: 40rpx;

    .box {
      width: 150rpx;
      height: 150rpx;
      line-height: 150rpx;
      color: #333;
      text-align: center;
      border: 1px solid #333;
      border-radius: 20rpx;
    }

    .true {
      color: #cdbd2f;
    }
  }
}
</style>
