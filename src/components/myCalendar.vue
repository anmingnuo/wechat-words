<template>
  <div style="display: flex; align-items: center; justify-content: center">
    <wd-calendar use-default-slot v-model="value">
      <image v-if="type !== 'button'" src="../pages/my/icons/出库记录.svg"></image>
      <wd-button v-else size="small" class="sign-in">签到记录</wd-button>
    </wd-calendar>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: string
}>()
const {type} = toRefs(props)
console.log(type.value)
const value = ref<number[]>([Date.now()])
</script>

<style scoped></style>
