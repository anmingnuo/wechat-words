<route lang="json5" type="home">
{
style: {
navigationBarTitleText: '登录',
},
}
</route>

<template>
  <view class="bg-white overflow-hidden pt-2 main-box center-container">
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
      <view class="register">
        <wd-tag mark plain @click="goToRegister">没有账号，去注册></wd-tag>
      </view>
    </wd-form>
    <wd-toast/>
    <wd-message-box/>
  </view>
</template>

<script lang="ts" setup>
import {useUserStore} from '@/store/user'
import {login, getInfo} from '@/api/login'
import {useToast} from 'wot-design-uni'
import {onLoad} from '@dcloudio/uni-app'
import {useMessage} from 'wot-design-uni'
import PLATFORM from '@/utils/platform'

let store = useUserStore()
const isHaveBook = store.userInfo.isHaveBook
const {safeAreaInsets} = uni.getSystemInfoSync()
const {success: showSuccess} = useToast()
const message = useMessage()

const model = reactive<{
  username: string
  password: string
}>({
  username: '',
  password: '',
})

const form = ref()
const toast = useToast()

function handleSubmit() {
  form.value
    .validate()
    .then(({valid, errors}) => {
      if (valid) {
        userLogin()
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

const goTo = (str) => {
  uni.switchTab({
    url: `/pages/${str}/main`,
  })
}
const userLogin = async () => {
  const res = await login({username: model.username, password: model.password})
  console.log('登录信息', res)
  let token = res.data.token
  let info = store.userInfo
  store.setUserInfo({...info, token})
  getUserInfo()
}
const getUserInfo = async () => {
  const res = await getInfo()
  toast.show(res.message)
  if (res.code === 200) {
    let info = store.userInfo
    store.setUserInfo({ ...info, ...res.data })
    setTimeout(() => {
      goTo('main')
    }, 1000)
  }
}
onLoad((options) => {
})

const goToRegister = () => {
  uni.navigateTo({
    url: '/pages/register/main',
  })
}
</script>
<style lang="scss" scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; /* 高度设置为视窗高度 */
  background-color: #ffffff; /* 设置背景色 */
  .footer {
    padding-top: 12px;
  }

  .register {
    padding-top: 5px;
    display: flex;
    justify-content: flex-end; /* 将内容对齐到右侧 */
  }
}
</style>
