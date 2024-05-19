<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
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
          <wd-button plain size="small" icon="search" type="warning" @click="search">搜索单词</wd-button>
        </view>
      </view>
      <view class="book-box" @click="goBook">
        {{ bookName }}
      </view>
      <view class="progress">
        <progress activeColor="#10AEFF" border-radius="20" show-info="true" :percent="progress"/>
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
        <wd-button @click="startStudy()" type="success" block>开始学习</wd-button>
      </view>
    </view>
    <wd-message-box/>
    <wd-toast/>
  </view>
</template>

<script lang="ts" setup>
// 获取屏幕边界到安全区域距离
import {useToast} from 'wot-design-uni'
import {useUserStore} from '@/store/user'
import {getProcess, getTodayTask} from '@/api/process/index'
import {useMessage} from 'wot-design-uni'
import {onShow} from '@dcloudio/uni-app'
import {getBookSelectionByUserId, getHaveBook} from "@/api/book";

const toast = useToast()
let store = useUserStore()
const message = useMessage()
const {safeAreaInsets} = uni.getSystemInfoSync()
const progress = ref(60)
const taskItems = ref([
  {num: 20, name: '已复习'},
  {num: 30, name: '待复习'},
])
const isHaveBook = ref(0)
let bookName = ref('请选择书籍')
const selectBook = () => {
  if (isHaveBook.value === 0) {
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
const search=()=>{
  if (isHaveBook.value === 0) {
    message
      .confirm({
        msg: '请选择书籍后再进行搜索',
        title: '系统提示',
      })
      .then(() => {
        console.log('点击了确定按钮')
        goTo('book')
      })
      .catch(() => {
        console.log('点击了取消按钮')
      })
  }else {
    goTo('search')
  }

}
const getToday = async () => {
  let uid = store.userInfo.userId
  const res = await getTodayTask(uid)
  if (res.code === 200) {
    taskItems.value[0].num = res.data['已复习']
    taskItems.value[1].num = res.data['待复习']
  }
}
const startStudy = () => {
  if (store.userInfo.token !== '') {
    if (isHaveBook.value === 0) {
      selectBook()
    } else {
      if (taskItems.value[1].num !== 0) {
        goTo('card')
      } else {
        toast.show('已经完成今日任务')
      }
    }
  }
}
const goTo = (str) => {
  uni.navigateTo({
    url: `/pages/${str}/main`,
  })
}
const getIsSelect =async ()=>{
  const  res =await getHaveBook(store.userInfo.userId)
  if (res.code===200){
    isHaveBook.value=res.data
  }
}
const getProcessById = async () => {
  const uid = store.userInfo.userId
  const res = await getProcess(uid)
  if (res.code === 200) {
    progress.value = res.data['学习进度']
  }
}
const getBookName = async () => {
  const res = await getBookSelectionByUserId(store.userInfo.userId)
  if (res.code === 200) {
    bookName.value = res.data.bookName
  }
}
const init = () => {
  if (store.userInfo.token === '') {
    goTo('login')
  } else {
    getProcessById()
    getToday()
    getBookName()
    getIsSelect()
  }
}
onShow(() => {
  init()
})
const goBook=()=>{
  goTo('book')
}
</script>

<style scoped lang="scss">
.main-title-color {
  color: #d14328;
}

.main-box {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
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
    line-height: 104rpx;
    text-align: left;
    background: url("./imgs/OIP-C (3).jpg") 100% no-repeat;
    border-radius: 20rpx;
    color: #e46e6e;
    font-size: larger;
    font-weight: bolder;
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
    margin-top: 20rpx;
    text-align: center;
  }
}

.button-hover {
  color: rgb(255 255 255 / 60%);
  background-color: #1eb4ff;
  border-color: #1eb4ff;
}
</style>
