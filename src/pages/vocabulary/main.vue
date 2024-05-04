<route lang="json5">
{
style: {
navigationBarTitleText: '生词本',
},
}
</route>

<template>
  <view class="bg-white overflow-hidden pt-2 px-8 main-box">
    <view class="card-box" v-if="curStatus">
      <view v-if="arr.length > 0" class="item" v-for="(item, index) in arr" @click="clickItem(item)">
        <view class="left">{{ item.wordName }}</view>
      </view>
      <view v-else>
        暂时没有生词
      </view>
    </view>
    <view class="card-box" v-else>
      <Details :char="char" @changeStatus="changeStatus" @changeFavStatus="changeFavStatus" :is-next-show="isShow"
               :is-fav="isFav"/>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Details from '@/components/Details.vue'
import {getVocabularyList} from '@/api/vocabulary'
import {useUserStore} from '@/store/user'

const {safeAreaInsets} = uni.getSystemInfoSync()
let store = useUserStore()
const isShow = false;
const arr = ref([])
const char = ref({})
const isFav = ref(false)
const goTo = (str) => {
  uni.navigateTo({
    url: `/pages/${str}/main`,
  })
}

const curStatus = ref(true)
const changeStatus = () => {
  curStatus.value = !curStatus.value
}
const changeFavStatus = () => {
  isFav.value = !isFav.value
}
const clickItem = (item) => {
  isFav.value = item.fav
  char.value = item
  changeStatus()
}
const params = ref({
  page: 1,
  size: 10
})
const getList = async () => {
  let data = {
    userId: store.userInfo.userId,
    ...params.value
  }
  let res = await getVocabularyList(data)
  if (res.code === 200) {
    arr.value = [...arr.value, ...res.data]
  }
  console.log(arr.value, '11111')
}
const init = () => {
  getList()
}
init()
</script>
<style lang="scss" scoped>
.main-box {
  flex: 1;
  background-color: #ffffff;
}

.card-box {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  .input-box {
    width: 100%;
    height: 100rpx;
    margin-bottom: 20rpx;
  }

  .item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 120rpx;
    padding: 0 40rpx;
    background: #ffffff;


    .left {
      font-size: 34rpx;
      color: #525252;
    }

    .right {
      margin-left: 40rpx;
      font-size: 34rpx;
      color: #525252;

    }
  }
}
</style>
