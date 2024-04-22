<template>
  <view class="detail-box">
    <view class="out-top">
      <view class="left">
        <view class="top">well</view>
        <view class="bottom">
          <view>
            <view class="bottom">well</view>
            <view class="center">井</view>
          </view>
          <view>
            <wd-icon name="sound" size="44rpx"></wd-icon>
          </view>
        </view>
      </view>
      <view class="right" @click="showToast">
        <wd-icon :name="isFav ? 'star-filled' : 'star'" size="44rpx"></wd-icon>
      </view>
    </view>
    <view style="width: 100%; margin: 20rpx 0; font-size: 50rpx">例句:</view>
    <view class="out-bottom">
      <view class="lines" v-for="(item, index) in arr">
        <view class="line">{{ item.lineText }}</view>
        <view class="line-cn">{{ item.lineCn }}</view>
      </view>
    </view>
    <view class="btn-box">
      <!-- size="small" -->
      <wd-button type="primary" @click="change">下一个</wd-button>
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
const isFav = ref(false)
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
  isFav.value = !isFav.value
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

      .bottom {
        display: flex;
        justify-content: space-between;

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
