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
    <view class="box">
      <avatar></avatar>
      <view class="desc">微信用户</view>
      <view class="icon-box">
        <view class="box-item" @click="goTo('book')">
          <wd-icon name="edit-outline" color="#7b7b7b" size="80rpx"></wd-icon>
          <view class="text">单词书</view>
        </view>
        <view class="box-item" @click="goTo('vocabulary')">
          <wd-icon name="spool" color="#7b7b7b" size="80rpx"></wd-icon>
          <view class="text">生词本</view>
        </view>
        <view class="box-item">
          <myCalendar type="'icon'" />
          <view class="text">计划表</view>
        </view>
      </view>
      <view class="hr"></view>
      <view class="item">
        <view class="left">
          <wd-icon name="view-list" color="#7b7b7b" size="60rpx"></wd-icon>
          <view class="text">每日学习量</view>
        </view>
        <view class="right">
          <view class="round-border">
            <wd-input
              type="text"
              v-model="value"
              placeholder="学习量"
              @change="handleChange"
              custom-input-class="wcenter"
              custom-class="wcenter"
              center
            />
          </view>
        </view>
      </view>
      <view class="item">
        <view class="left">
          <wd-icon name="rollback" color="#7b7b7b" size="60rpx"></wd-icon>
          <view class="text">问题反馈</view>
        </view>
        <view class="right" @click="showToast">
          <wd-icon name="arrow-right" color="#7b7b7b" size="60rpx"></wd-icon>
        </view>
      </view>
      <view class="item">
        <view class="left">
          <wd-icon name="share" color="#7b7b7b" size="60rpx"></wd-icon>
          <view class="text">分享小程序</view>
        </view>
        <view class="right" @click="showToast">
          <wd-icon name="arrow-right" color="#7b7b7b" size="60rpx"></wd-icon>
        </view>
      </view>
    </view>
    <wd-toast />
  </view>
</template>

<script lang="ts" setup>
import { useToast } from 'wot-design-uni'
import PLATFORM from '@/utils/platform'
import avatar from './components/avatar.vue'
import myCalendar from '@/components/myCalendar.vue'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const value = ref<string>('')
const handleChange = (event) => {
  console.log(event)
}
const toast = useToast()

const showToast = () => {
  console.log(111)

  toast.show('暂未开放')
}
const goTo = (str) => {
  uni.redirectTo({
    url: `/pages/${str}/main`,
  })
}
</script>
<style lang="scss" scoped>
.desc {
  height: 80rpx;

  // color: #7b7b7b;
}

.box {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 45rpx;

  .icon-box {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 40rpx;
  }

  .text {
    font-size: 26rpx;
    color: #7b7b7b;
    text-align: center;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    height: 100rpx;
    margin: 20rpx 0;

    .left {
      display: flex;
      align-items: center;
      font-size: 30rpx;
      color: #7b7b7b;

      .text {
        margin-left: 20rpx;
        font-size: 34rpx;
      }
    }

    .right {
      .round-border {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200rpx;
        padding: 12rpx 56rpx;
        text-align: center;
        border: 2rpx solid #1c9813;
        border-radius: 80rpx;

        input {
          text-align: center;
        }
      }
    }
  }
}

.hr {
  width: 100%;
  height: 2rpx;
  margin: 40rpx 0;
  background-color: #7b7b7b;
}

.hr-coloum {
  width: 2rpx;
  height: 100%;
  background-color: #7b7b7b;
}

.wcenter {
  text-align: center !important;
}
</style>
