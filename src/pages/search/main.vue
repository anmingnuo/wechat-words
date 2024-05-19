<route lang="json5">
{
style: {
navigationBarTitleText: '搜索',
},
}
</route>
<template>

    <wd-search v-model="value" @focus="focus" @blur="blur" @search="search" @clear="clear" @cancel="cancel" @change="change"  light/>
    <wd-divider></wd-divider>
    <div class="card" v-for="(word,index) in wordList" :key="word.id">
      <div class="word-name">{{ word.wordName }}</div>
      <div class="word-meaning">{{ word.chineseMeaning }}</div>
      <div class="word-ipa">
      <span class="word-ipa-british">
        英 {{ word.ukPronunciation }}
        <img
          src="@/pages/search/img/sound.svg"
          alt="British Pronunciation"
          @click="playBritishPronunciation(word.ukSpeech)"
          class="icon"
        />
      </span>
        <span class="word-ipa-american">
        美 {{ word.usPronunciation }}
        <img
          src="@/pages/search/img/sound.svg"
          alt="British Pronunciation"
          @click="playAmericanPronunciation(word.usSpeech)"
          class="icon"
        />
      </span>
      </div>
    </div>
    <wd-toast/>
</template>
<script lang="ts" setup>
import {searchWord} from "@/api/vocabulary";

let value = ref < string > ('')
let wordList=ref<any>([])
// 获取屏幕边界到安全区域距离
const {safeAreaInsets} = uni.getSystemInfoSync()
import {useUserStore} from '@/store/user'
import {base_audio_url} from "@/utils/base";
let store = useUserStore()

// 播放英式发音的函数
function playBritishPronunciation(sound) {
  audioPlay(sound)
}

// 播放美式发音的函数
function playAmericanPronunciation(sound) {
  audioPlay(sound)
}

function audioPlay(sound){
  const innerAudioContext = uni.createInnerAudioContext();
  innerAudioContext.src = base_audio_url+sound;
  innerAudioContext.onPlay(() => {
    console.log('开始播放');
  });
  innerAudioContext.onError((res) => {
    console.log(res.errMsg);
    console.log(res.errCode);
  });
  innerAudioContext.play()
}
function focus() {
  console.log('聚焦')
}

function blur() {

}
const userSearch= async ()=>{
  console.log(value.value)
  let res=await searchWord(store.userInfo.userId,value.value)
  wordList.value=res.data
}
function search() {
  userSearch()
}

function clear() {
  console.log('重置')
}

function cancel() {
  console.log('取消')
}

function change({value}) {
  console.log('输入', value)
}
</script>
<style>
.card {
  border: 2px solid #4A90E2; /* 边框颜色加深 */
  padding: 20px; /* 增加内边距 */
  border-radius: 12px; /* 更大的圆角 */
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2); /* 渐变背景 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* 更深的阴影 */
}

.word-name {
  font-size: 28px; /* 更大的字体 */
  font-weight: bold; /* 加粗 */
  color: #333; /* 深色 */
}

.word-meaning {
  font-size: 18px; /* 字体大小 */
  color: #555; /* 较深的灰色 */
}

.word-ipa {
  font-size: 16px; /* 字体大小 */
  color: #777; /* 灰色 */
}

.word-ipa-british, .word-ipa-american {
  margin-right: 16px; /* 间距 */
  display: inline-block; /* 保证图标在同一行 */
}

.icon {
  width: 16px; /* 图标宽度 */
  height: 16px; /* 图标高度 */
  cursor: pointer; /* 鼠标悬停变为手指 */
}

.icon:hover {
  transform: scale(1.2); /* 鼠标悬停时的缩放 */
}
</style>
