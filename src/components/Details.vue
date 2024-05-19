<template>
  <view class="detail-box">
    <view class="out-top">
      <view class="left">
        <view class="top">{{char.wordName}}</view>
        <view class="bottom">
          <view>
            <view class="bottom">英</view>
          </view>
          <view>
            <view class="bottom">{{char.ukPronunciation}}</view>
          </view>
          <view>
            <wd-icon name="sound" size="44rpx" @click="audioPlay('uk')"></wd-icon>
          </view>
        </view>
        <view class="bottom">
          <view>
            <view class="bottom">美</view>
          </view>
          <view>
            <view class="bottom">{{char.usPronunciation}}</view>
          </view>
          <view>
            <wd-icon name="sound" size="44rpx" @click="audioPlay('us')"></wd-icon>
          </view>
        </view>
      </view>
      <view class="right" @click="changeWord">
        <wd-icon v-if="isFav" name="star-filled" size="44rpx"></wd-icon>
        <wd-icon v-else name='star' size="44rpx"></wd-icon>
      </view>
    </view>
    <view style="width: 100%; margin: 20rpx 0; font-size: 50rpx">例句:</view>
    <view class="out-bottom">
      <view class="lines" v-for="(item, index) in char.sentenceList">
        <view class="line">{{ item.english }}</view>
        <view class="line-cn">{{ item.chinese }}</view>
      </view>
    </view>
    <view class="btn-box">
      <!-- size="small" -->
      <wd-button type="primary" @click="change" v-if="isNextShow">下一个</wd-button>
      <wd-button type="primary" @click="change" v-else>关闭</wd-button>
    </view>
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { useToast } from 'wot-design-uni'
import {saveWord,removeWord} from '@/api/vocabulary'
const props = defineProps<{
  char: any,
  isNextShow:{
    type:Boolean,
    default:true
  },
  isFav:{
    type:Boolean,
    default:false
  }
}>()
const emit = defineEmits()
let store = useUserStore()
const change = () => {
  emit('changeStatus')
}
const { char,isNextShow,isFav } = toRefs(props)
const toast = useToast()
const changeWord = async ()=>{
  let data = {
    userId:store.userInfo.userId,
    wordId:char.value.id
  }
  console.log(isFav.value,'isFav')
  if(isFav.value){
    //删除
    let res = await removeWord(data);
    if(res.code === 200){
      emit('changeFavStatus')
        toast.show('已经从生词本移除')
    }
  }else{
    let res = await saveWord(data);
    if(res.code === 200){
      emit('changeFavStatus')
        toast.show('已经添加至生词本')
    }
  }
}
const audioPlay = (type)=>{
  const innerAudioContext = uni.createInnerAudioContext();
  innerAudioContext.src = type==='uk'?char.value.ukSpeech:char.value.usSpeech;
  innerAudioContext.onPlay(() => {
    console.log(char.value.ukSpeech)
    console.log('开始播放');
  });
  innerAudioContext.onError((res) => {
    console.log(res.errMsg);
    console.log(res.errCode);
  });
  innerAudioContext.play()
}
</script>

<style scoped>
.detail-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  height: 80vh;
  background-color: #ffffff;

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
        font-weight: bold;
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
