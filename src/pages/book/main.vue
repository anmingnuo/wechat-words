<route lang="json5">
{
  style: {
    navigationBarTitleText: '单词书',
  },
}
</route>

<template>
  <view class="bg-white overflow-hidden pt-2 px-4 main-box">
    <view class="card-box">
      <view class="input-box">
        <wd-input
          prefix-icon="search"
          type="text"
          v-model="params.keyword"
          placeholder="请输入搜索关键词"
          @change="handleChange"
        />
      </view>
      <view class="item" v-for="(item, index) in arr" @click="changeBook(item)">
        <view class="left">
          <image
            class=""
            :src="item.img"
            mode="aspectFit"
            lazy-load="false"
            binderror=""
            bindload=""
          ></image>
        </view>
        <view class="right">
          <view class="top">{{ item.bookName }}</view>
          <view class="bottom">{{ item.nums }}词</view>
        </view>
      </view>
    </view>
    <wd-message-box />
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { useUserStore } from '@/store/user'
import { getBook, saveBook } from '@/api/book'
import { useMessage } from 'wot-design-uni'
let store = useUserStore()
// import avatar from './components/avatar.vue'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const message = useMessage()
const arr = ref([])
const changeBook = (item) => {
  console.log(item)
  message
    .confirm({
      msg: `是否选择${item.bookName}进行学习？`,
      title: '系统提示',
    })
    .then(() => {
      console.log('点击了确定按钮')
      save(item.id)
    })
    .catch(() => {
      console.log('点击了取消按钮')
    })
}
const params = ref({
  keyword: '',
  page: 1,
  size: 10,
})
const getList = async () => {
  const res = await getBook(params.value)
  arr.value = [...arr.value, ...res.data]
  console.log(arr.value)
}
const save = async (bookId) => {
  let userId = parseInt(store.userInfo.userId)
  let data = {
    bookId,
    userId,
  }
  const res = await saveBook(data)
  console.log('保存书籍', res)
}
const handleChange = () => {
  params.value.page = 1
  getList()
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
    height: 220rpx;
    border-bottom: solid 2rpx black;

    .left {
      image {
        width: 200rpx;
        height: 200rpx;
        margin-left: 20rpx;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 40rpx;

      .top {
        font-size: 40rpx;
        color: #525252;
      }

      .bottom {
        font-size: 30rpx;
        color: #7b7b7b;
      }
    }
  }
}
</style>
