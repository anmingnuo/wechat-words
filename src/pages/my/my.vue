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
          <image src="./icons/验收管理.svg"></image>
          <view class="text">单词书</view>
        </view>
        <view class="box-item" @click="goTo('vocabulary')">
          <image src="./icons/缓存列表.svg"></image>
          <view class="text">生词本</view>
        </view>
        <view class="box-item" @click="goTo('sign')">
          <image src="./icons/打卡.svg"></image>
          <view class="text">签到记录</view>
        </view>
      </view>
      <view class="hr"></view>
      <view class="item">
        <view class="left">
          <image src="./icons/闹钟.svg" mode="aspectFit" class="img"></image>
          <view class="text">每日计划</view>
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
      <view class="item" @cvlick="withSlot">
        <view class="left">
          <image src="./icons/喇叭.svg" mode="aspectFit" class="img"></image>
          <view class="text">问题反馈</view>
        </view>
        <view class="right">
          <wd-icon name="arrow-right" color="#7b7b7b" size="60rpx"></wd-icon>
        </view>
      </view>
      <view class="item" @click="showToast">
        <view class="left">
          <image src="./icons/分享.svg" class="img"></image>
          <view class="text">分享小程序</view>
        </view>
        <view class="right">
          <wd-icon name="arrow-right" color="#7b7b7b" size="60rpx"></wd-icon>
        </view>
      </view>
    </view>
    <wd-message-box selector="wd-message-box-slot">
      <wd-input type="text" label="反馈标题" v-model="feedBackItem.title" placeholder="请输入标题"/>
      <wd-textarea v-model="feedBackItem.content" placeholder="请填写反馈内容"/>
    </wd-message-box>
    <wd-toast/>
  </view>
</template>

<script lang="ts" setup>
import {saveFeedback} from '@/api/feedback'
import {useMessage} from 'wot-design-uni'
import {updatePlan} from '@/api/process'
import {useToast} from 'wot-design-uni'
import PLATFORM from '@/utils/platform'
import avatar from './components/avatar.vue'
import myCalendar from '@/components/myCalendar.vue'
import {useUserStore} from '@/store/user'
import {onLoad, onShow} from '@dcloudio/uni-app'

const toast = useToast()
const message = useMessage('wd-message-box-slot')
// 获取屏幕边界到安全区域距离
const {safeAreaInsets} = uni.getSystemInfoSync()
let store = useUserStore()
const value = ref<string>('')
const handleChange = async () => {
  let data = {
    userId: store.userInfo.userId,
    dailyGoal: value.value
  }
  let res = await updatePlan(data)
  if (res.code !== 200) {
    toast.show('因为未知原因，修改失败，请稍后重试')
  }
}

const showToast = () => {
  console.log(111)

  toast.show('暂未开放')
}
const goTo = (str) => {
  uni.navigateTo({
    url: `/pages/${str}/main`,
  })
}
const feedBackItem = ref({
  title: '',
  content: ''
})
const withSlot = () => {
  message
    .confirm({
      title: '问题反馈'
    })
    .then(() => {
      sendFeedBack()
    })
    .catch((error) => {
      console.log(error)
    })
}
const sendFeedBack = async () => {
  let data = {
    userId: store.userInfo.userId,
    ...feedBackItem.value
  }
  let res = await saveFeedback(data);
  if (res.code === 200) {
    toast.show('反馈成功')
  }
}
onShow(() => {
  value.value = store.userInfo.dailyGoal
})
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
    margin-top: 20rpx;
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
      font-size: 20rpx;
      color: #7b7b7b;

      .img {
        width: 60rpx;
        height: 60rpx;
      }

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
