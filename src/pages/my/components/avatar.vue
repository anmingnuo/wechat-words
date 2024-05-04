<template>
  <wd-img-cropper v-model="show" :img-src="src" @confirm="handleConfirm" @cancel="handleCancel" />
  <view class="profile">
    <view v-if="!imgSrc" class="img" @click="upload">
      <wd-icon name="fill-camera" custom-class="img-icon"></wd-icon>
      <view style="font-size: 14px">点击上传头像</view>
    </view>
    <wd-img
      v-if="imgSrc"
      round
      width="150rpx"
      height="150rpx"
      :src="imgSrc"
      mode="aspectFit"
      custom-class="profile-img"
      @click="upload"
    />
  </view>
</template>

<script lang="ts" setup>
const src = ref<string>('')
const imgSrc = ref<string>('https://wechat-word.oss-cn-beijing.aliyuncs.com/default_avatar.jpg')
const show = ref<boolean>(false)

function upload() {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const tempFilePaths = res.tempFilePaths[0]
      src.value = tempFilePaths
      show.value = true
    },
  })
}
function handleConfirm(event) {
  const { tempFilePath } = event
  imgSrc.value = tempFilePath
}
function imgLoaderror(res) {
  console.log('加载失败', res)
}
function imgLoaded(res) {
  console.log('加载成功', res)
}
function handleCancel(event) {
  console.log('取消', event)
}
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;

  view {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.profile-img {
  width: 150rpx !important;
  height: 150rpx !important;
}
</style>
