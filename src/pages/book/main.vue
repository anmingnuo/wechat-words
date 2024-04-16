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
          v-model="keyword"
          placeholder="请输入搜索关键词"
          @change="handleChange"
        />
      </view>
      <view class="item" v-for="(item, index) in arr">
        <view class="left">
          <image
            class=""
            :src="item.img"
            mode="aspectFit|aspectFill|widthFix"
            lazy-load="false"
            binderror=""
            bindload=""
          ></image>
        </view>
        <view class="right">
          <view class="top">{{ item.name }}</view>
          <view class="bottom">{{ item.nums }}词</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
// import avatar from './components/avatar.vue'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const arr = ref([
  {
    name: '高考大纲词汇',
    nums: 3521,
    img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.wqUGd299Jxz55hxqD2dqoAHaKN?rs=1&pid=ImgDetMain',
  },
  {
    name: '四级核心词汇',
    nums: 4567,
    img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.wqUGd299Jxz55hxqD2dqoAHaKN?rs=1&pid=ImgDetMain',
  },
  {
    name: '六级核心词汇',
    nums: 6789,
    img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.wqUGd299Jxz55hxqD2dqoAHaKN?rs=1&pid=ImgDetMain',
  },
  {
    name: '考研核心词汇',
    nums: 9102,
    img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.wqUGd299Jxz55hxqD2dqoAHaKN?rs=1&pid=ImgDetMain',
  },
])
const keyword = ref('')
const handleChange = (event) => {
  console.log(event)
  console.log(keyword.value)
}
</script>
<style lang="scss" scoped>
.main-box {
  flex: 1;
  background-color: #f5f5f5;
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
