<route lang="json5">
{
style: {
navigationBarTitleText: '签到',
},
}
</route>

<template>
  <view class="bg-white overflow-hidden pt-2 px-8 main-box">
    <view class="card-box calendar">
      <wd-calendar-view type="dates" v-model="dateArr" @change="handleChange" />
    </view>
    <view class="card-box sub-box">
      <view class="dayBox">
        <view>连续签单</view>
        <view>连续签单</view>
<!--        {{store.userInfo.continue}}-->
      </view>
      <view class="dayBox">
        <view>累计签单</view>
        <view>连续签单</view>
<!--        {{store.userInfo.sum}}-->
      </view>
    </view>
    <view class="card-box">
      <wd-button>签到</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Details from '@/components/Details.vue'
import {getSignList} from '@/api/sign'
import {useUserStore} from '@/store/user'

const {safeAreaInsets} = uni.getSystemInfoSync()
let store = useUserStore()

const dateArr = ref([Date.now()])

const handleChange = (e)=>{
  console.log(e)
}
const goTo = (str) => {
  uni.navigateTo({
    url: `/pages/${str}/main`,
  })
}

const getDateArr = async ()=>{
  let res = await getSignList(store.userInfo.userId)
  dateArr.value = res.data
}

const init = () => {
  getDateArr()
}
init()
</script>
<style lang="scss" scoped>
.main-box {
  background-color: #ffffff;
}

.card-box {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .dayBox {
    border-top: 1rpx solid #000;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    view {
      background-color: #red;
      margin: 10rpx;
    }
  }
}

.sub-box {
  padding: 0 40rpx;
  margin-top: 16rpx;
}
.calendar {
  height: 60vh!important;
}
</style>
