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
          {{ char.wordName }}
        </view>
      </view>
      <view class="bottom">
        <view class="box" style="color: #4cd964;border:1px solid #4cd964" @click="recordThisWord(2)">认识</view>
        <view class="box" style="color: #cdbd2f;border:1px solid #cdbd2f"  @click="recordThisWord(1)">模糊</view>
        <view class="box" style="color: #dd524d;border:1px solid #dd524d"  @click="recordThisWord(0)">不认识</view>
      </view>
    </view>
    <view class="card-box" v-else>
      <Details :char="char" @changeStatus="nextWord" @changeFavStatus="changeFavStatus" :is-next-show="true" :is-fav="isFav"/>
    </view>
    <wd-toast />
  </view>
</template>

<script lang="ts" setup>
import { useToast } from 'wot-design-uni'
import { getTodayTask } from '@/api/process/index'
import { useUserStore } from '@/store/user'
import Details from '@/components/Details.vue'
import {getword,record} from "@/api/vocabulary/index"
import { onLoad } from '@dcloudio/uni-app'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const toast = useToast()
let store = useUserStore()
const char = ref({
  wordName:'well',
  id:'',
  fav:false
})
const isFav = ref(false)
const goTo = (str) => {
  uni.redirectTo({
    url: `/pages/${str}/main`,
  })
}
const curStatus = ref(true)
const recordThisWord = async (type)=>{
  console.log(type)
  let data = {
    userId:store.userInfo.userId,
    wordId:char.value.id,
    level:type
  }
  let res = await record(data)
  changeStatus()
}
const changeStatus = () => {
  curStatus.value = !curStatus.value
}
const changeFavStatus = () => {
  isFav.value = !isFav.value
}
const getWordById = async ()=>{
  console.log(store.userInfo.userId)
  let res = await getword(store.userInfo.userId);
  char.value =res.data;
  isFav.value = res.data.fav
}
const nextWord = async()=>{
  let uid = store.userInfo.userId
  const res = await getTodayTask(uid)
  let remainder = res.data['待复习']
  if(remainder<=0){
    toast.show('已经完成今日任务')
  }else{
    changeStatus();
    getWordById();
  }
}
onLoad((options) => {
  getWordById()
})
</script>
<style lang="scss" scoped>
.main-box {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
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
