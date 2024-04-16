<template>
  <view class="detail-box">
    <view class="out-top">
      <view class="left">
        <view class="top">well</view>
        <view class="bottom">well</view>
        <view class="center">井</view>
      </view>
      <view class="right"><wd-icon name="sound" size="22px"></wd-icon></view>
    </view>
    <view style="width: 100%; margin: 20rpx 0; font-size: 50rpx">例句:</view>
    <view class="out-bottom">
      <view class="lines" v-for="(item, index) in arr">
        <view class="line">{{ item.lineText }}</view>
        <view class="line-cn">{{ item.lineCn }}</view>
      </view>
    </view>
    <view class="btn-box">
      <wd-button type="primary" size="small" @click="change">明白了</wd-button>
      <wd-button type="success" size="small" @click="showToast">添加到生词本</wd-button>
    </view>
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
import { useToast } from 'wot-design-uni'

import { onLoad } from '@dcloudio/uni-app'
const props = defineProps<{
  id: string
}>()
const emit = defineEmits()
const change = () => {
  emit('changeStatus')
}
const { id } = toRefs(props)
const arr = ref([
  {
    lineText: 'I love well',
    lineCn: '我喜欢井',
  },
  {
    lineText: 'I love well',
    lineCn: '我喜欢井',
  },
  {
    lineText: 'I love well',
    lineCn: '我喜欢井',
  },
  {
    lineText: 'I love well',
    lineCn: '我喜欢井',
  },
])
const toast = useToast()

const showToast = (str) => {
  toast.show('已经添加至生词本')
}
onLoad(() => {
  console.log(id.value)
})
</script>

<style scoped>
.detail-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  height: 80vh;
  background-color: #f5f5f5;

  .out-top {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .left {
      display: flex;
      flex-direction: column;
      align-items: center;

      .top {
        font-size: 60rpx;
        color: #000;
      }

      .center {
        padding-left: 20rpx;
        font-size: 60rpx;
        color: #000;
      }

      .bottom {
        font-size: 34rpx;
        color: #7b7b7b;
      }
    }
  }

  .out-bottom {
    display: flex;
    flex-direction: column;
    width: 100%;

    .line {
      font-size: 34rpx;
      color: #7b7b7b;
    }

    .line-cn {
      font-size: 34rpx;
      font-style: italic;
      color: #000;
    }
  }

  .btn-box {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 20rpx;
  }
}
</style>
