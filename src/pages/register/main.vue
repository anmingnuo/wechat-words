<route lang="json5">
{
style: {
navigationBarTitleText: '注册',
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
    </wd-form>
    <wd-toast/>
  </view>
</template>
<script lang="ts" setup>
import {saveUser} from '@/api/register'
import {useToast} from 'wot-design-uni'

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
        userRegister()
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

const userRegister = async () => {
  const res = await saveUser({username: model.username, password: model.password})
  toast.show(res.message)
  if (res.code === 200) {
    setTimeout(() => {
      uni.navigateBack()
    }, 1000)
  }
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
}
</style>
