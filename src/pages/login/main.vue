<route lang="json5">
{
  style: {
    navigationBarTitleText: '登录',
  },
}
</route>

<template>
  <view class="bg-white overflow-hidden pt-2 main-box">
    <wd-form ref="form" :model="model">
      <wd-cell-group border>
        <wd-input
          label="用户名"
          label-width="100px"
          prop="username"
          clearable
          v-model="model.username"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <wd-input
          label="密码"
          label-width="100px"
          prop="password"
          show-password
          clearable
          v-model="model.password"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </wd-cell-group>
      <view class="footer">
        <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
      </view>
    </wd-form>
    <wd-toast />
    <wd-message-box />
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { login, getInfo } from '@/api/login'
import { useToast } from 'wot-design-uni'
import { onLoad } from '@dcloudio/uni-app'
import { useMessage } from 'wot-design-uni'
import PLATFORM from '@/utils/platform'
let store = useUserStore()
const isHaveBook = store.userInfo.isHaveBook
// import avatar from './components/avatar.vue'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const { success: showSuccess } = useToast()
const message = useMessage()

const model = reactive<{
  username: string
  password: string
}>({
  username: '',
  password: '',
})

const form = ref()

function handleSubmit() {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {
        // showSuccess({
        //   msg: '校验通过',
        // })
        userLogin()
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
const goTo = (str) => {
  uni.redirectTo({
    url: `/pages/${str}/main`,
  })
}
const userLogin = async () => {
  const res = await login({ username: model.username, password: model.password })
  console.log('登录信息', res)
  let token = res.data.token
  let info = store.userInfo
  store.setUserInfo({ ...info, token })
  getUserInfo()
}
const getUserInfo = async () => {
  const res = await getInfo()
  let info = store.userInfo
  console.log(info)
  store.setUserInfo({ ...info, ...res.data })
  console.log('用户信息', store.userInfo)
  if (isHaveBook === '') {
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
  goTo('main')
}
onLoad((options) => {})
</script>
<style lang="scss" scoped>
.footer {
  padding: 12px;
}
</style>
