<route lang="json5">
{
style: {
navigationBarTitleText: '签到',
},
}
</route>

<template>
  <view>
    <!-- 插入模式 -->
    <uni-calendar
      class="uni-calendar--hook"
      :showMonth="true"
      @change="change"
      @monthSwitch="monthSwitch"
      :selected="dateArr"
    />
  </view>
  <div class="btn-sign">
    <wd-button type="success" @click="toSign">签到</wd-button>
  </div>
  <wd-divider></wd-divider>
  <wd-toast />
</template>

<script lang="ts" setup>
import {getSignList, sign} from '@/api/sign'
import {useUserStore} from '@/store/user'
import UniCalendar from '@/components/uni-calendar/uni-calendar.vue'
import {useToast} from 'wot-design-uni'

const {safeAreaInsets} = uni.getSystemInfoSync()
const store = useUserStore()
const toast = useToast()
const dateArr = ref([
  {
    date: '2024-05-01',
    info: '已打卡',
  },
])
const goTo = (str) => {
  uni.navigateTo({
    url: `/pages/${str}/main`,
  })
}
const change = (e) => {
  console.log(e)
}
const monthSwitch = (e: any) => {
  const date = e.year + '-' + e.month + '-' + '28'
  getDateArr(date)
}
const getDateArr = async (date) => {
  const res = await getSignList(store.userInfo.userId, date)
  dateArr.value = res.data
}
const toSign = async () => {
  const userId = store.userInfo.userId
  const res = await sign(userId)
  toast.show(res.message)
  init()
}

const init = () => {
  const date = new Date()
  const month = date.getMonth() + 1
  const str = date.getFullYear() + '-' + month + '-' + date.getDate()
  getDateArr(str)
}
init()
</script>
<style lang="scss" scoped>
.main-box {
  background-color: #ffffff;
}

.btn-sign {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>
