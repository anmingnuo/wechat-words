<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '没人背单词',
  },
}
</route>
<template>
  <view
    class="bg-black overflow-hidden main-box"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view class="navigation">没人背单词</view>
    <view class="hello mt-4 px-8">
      <view class="top">我在使用没人背单词</view>
      <view class="bottom">
        <view class="left">Hello~</view>
        <view class="right">
          <myCalendar type="button" />
        </view>
      </view>
      <!-- :style="'background:'isHaveBook?isHaveBook:''" -->
      <view class="book-box" @click="selectBook()">
        {{ isHaveBook ? '' : '请选择书籍' }}
      </view>
      <view class="progress">
        <progress activeColor="#10AEFF" border-radius="20" show-info="true" :percent="progress" />
      </view>
      <view class="task">
        <view class="task-top">
          <view class="task-top-title">-今日任务-</view>
        </view>
        <view class="task-bottom">
          <view class="task-box">
            <view class="task-num">{{ taskItems[0].num }}</view>
            <view class="task-name">已复习</view>
          </view>
          <view class="task-box">
            <view class="task-num">{{ taskItems[1].num }}</view>
            <view class="task-name">未复习</view>
          </view>
        </view>
      </view>
      <view class="start">
        <button
          style="color: #fff; background-color: #10aeff; border-color: #10aeff"
          size="mini"
          type="primary"
          hover-class="button-hover"
          @click="goToLogin()"
        >
          开始学习
        </button>
      </view>
    </view>
    <wd-message-box />
  </view>
</template>

<script lang="ts" setup>
// 获取屏幕边界到安全区域距离
import { useUserStore } from '@/store/user'
import myCalendar from '@/components/myCalendar.vue'
import { getProcess, getTodayTask } from '@/api/process/index'
import { useMessage } from 'wot-design-uni'
import { onLoad, onShow } from '@dcloudio/uni-app'
let store = useUserStore()
const message = useMessage()
const { safeAreaInsets } = uni.getSystemInfoSync()
const isHaveBook = store.userInfo.isHaveBook
const progress = ref(60)
const taskItems = ref([
  { num: 20, name: '复习单词' },
  { num: 30, name: '未学单词' },
])
const selectBook = () => {
  console.log('选择书籍')
  if (!isHaveBook) {
    message
      .confirm({
        msg: '请选择书籍后再进行学习',
        title: '系统提示',
      })
      .then(() => {
        console.log('点击了确定按钮')
        goTo('book')
      })
      .catch(() => {
        console.log('点击了取消按钮')
      })
  }
}
const getToday = async () => {
  let uid = store.userInfo.userId
  const res = await getTodayTask(uid)
  taskItems.value[0].num = res.data['已复习']
  taskItems.value[1].num = res.data['待复习']
}
const goToLogin = () => {
  if (store.userInfo.token !== '') {
    goTo('card')
  } else {
    goToLogin()
    message
      .confirm({
        msg: '请先登录',
        title: '系统提示',
      })
      .then(() => {
        console.log('点击了确定按钮')
        goTo('login')
      })
      .catch(() => {
        console.log('点击了取消按钮')
      })
  }
}
const goTo = (str) => {
  uni.navigateTo({
    url: `/pages/${str}/main`,
  })
}
const getProcessById = async () => {
  let uid = store.userInfo.userId
  const res = await getProcess(uid)
  progress.value = res.data['学习进度']
}
const init = () => {
  if (store.userInfo.token === '') {
    console.log(111)
    goTo('login')
  } else {
    getProcessById()
    getToday()
  }
}
onShow(() => {
  init()
})
</script>

<style scoped lang="scss">
.main-title-color {
  color: #d14328;
}

.main-box {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.navigation {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  background-color: #fff;
}

.hello {
  display: flex;
  flex: 1;
  flex-direction: column;

  .top {
    font-size: 32rpx;
    color: #333;
  }

  .bottom {
    display: flex;
    justify-content: space-between;

    .left {
      font-size: 80rpx;
      font-weight: bold;
      color: #333;
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 300rpx;
      padding-left: 180rpx;
    }
  }

  .book-box {
    box-sizing: border-box;
    width: 100%;
    height: 300rpx;
    padding: 0 40rpx;
    margin: 40rpx 0 0;
    line-height: 300rpx;
    text-align: center;
    background-color: #39c5bb;
    border-radius: 20rpx;
  }

  .progress {
    margin-top: 40rpx;
  }

  .task {
    width: 100%;
    height: 300rpx;
    margin-top: 40rpx;

    .task-top {
      text-align: center;

      .task-top-title {
        font-size: 30rpx;
        color: #969696;
      }
    }

    .task-bottom {
      display: flex;
      justify-content: space-around;
      margin-top: 40rpx;

      .task-box {
        width: 200rpx;
        height: 200rpx;
        text-align: center;

        .task-num {
          font-size: 60rpx;
          font-weight: bold;
          color: #333;
        }

        .task-name {
          font-size: 30rpx;
          font-weight: lighter;
          color: #333;
        }
      }
    }
  }

  .start {
    width: 100%;
    height: 100rpx;
    margin-top: 40rpx;
    text-align: center;
  }
}

.button-hover {
  color: rgb(255 255 255 / 60%);
  background-color: #1eb4ff;
  border-color: #1eb4ff;
}
</style>
