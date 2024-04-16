<template>
  <div style="display: flex; align-items: center; justify-content: center">
    <wd-calendar use-default-slot v-model="value">
      <wd-icon v-if="type !== 'button'" color="#7b7b7b" name="list" size="80rpx"></wd-icon>
      <wd-button v-else size="small">查看计划</wd-button>
    </wd-calendar>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: string
}>()
const { type } = toRefs(props)
console.log(type.value)
const value = ref<number[]>([Date.now()])
</script>

<style scoped></style>
