<template>
  <wd-img-cropper v-model="show" :img-src="src" @confirm="handleConfirm" @cancel="handleCancel"/>
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
import {getPolicy} from "@/api/oss";
const src = ref<string>('')
const imgSrc = ref<string>('https://wechat-word.oss-cn-beijing.aliyuncs.com/default_avatar.jpg')
const show = ref<boolean>(false)
const host = ref<string>('')
const ossAccessKeyId = ref<string>('')
const policy = ref<string>('')
const signature =ref<string>('')
const dir = ref<string>('')
const expire = ref<string>('')

const upload =async () =>{
  let timestamp=new Date().getTime();
  let ossPolicy=await getPolicy()
  if(!ossPolicy) return uni.showToast({title:"获取OSS服务失败",icon:"none",duration:1500})
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], //从相册选择
    success: async (res) => {
      src.value = res.tempFilePaths[0]
      show.value = true
      MyUpload()
    }
  })
}
const MyUpload=async ()=>{
  let resp=await getPolicy()
  if (resp.code===200){
    host.value=resp.data.host
    ossAccessKeyId.value=resp.data.accessid
    policy.value=resp.data.policy
    signature.value=resp.data.signature
    dir.value=resp.data.dir
    expire.value=resp.data.expire
    src.value.
    uni.uploadFile({
      url: host,
      filePath: src.value,
      name: 'file', // 必须填file。
      formData: {
        key:dir.value,
        policy,
        OSSAccessKeyId: ossAccessKeyId,
        signature,
      },
      success: (res) => {
        if (res.statusCode === 204) {
          console.log('上传成功');
        }
      },
      fail: err => {
        console.log(err);
      }
    });
  }
}
function handleConfirm(event) {
  const {tempFilePath} = event
  imgSrc.value = tempFilePath
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
