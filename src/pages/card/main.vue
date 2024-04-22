<route lang="json5">
{
  style: {
    navigationBarTitleText: '单词',
  },
}
</route>

<template>
  <view class="bg-white overflow-hidden pt-2 main-box">
    <view class="card-box" v-if="curStatus">
      <view class="top">
        <view class="text">
          {{ char.name }}
        </view>
      </view>
      <view class="bottom">
        <view class="box true" @click="changeStatus">认识</view>
        <view class="box" @click="changeStatus">模糊</view>
        <view class="box" @click="changeStatus">不认识</view>
      </view>
    </view>
    <view class="card-box" v-else>
      <Details id="1" @changeStatus="changeStatus" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import Details from '@/components/Details.vue'
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
  uni.redirectTo({
    url: `/pages/${str}/main`,
  })
}
const curStatus = ref(true)
const changeStatus = () => {
  curStatus.value = !curStatus.value
}
onLoad((options) => {
  char.value.name += Math.random().toFixed(2) + ''
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
    // width: 400rpx;

    // height: 400rpx;
    line-height: 400rpx;
    text-align: center;

    .text {
      width: 100%;
      overflow: hidden;
      font-size: 50rpx;
      font-weight: bold;
      color: #333;
      text-overflow: ellipsis;
      white-space: nowrap;

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
