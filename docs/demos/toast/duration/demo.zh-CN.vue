<template>
  <Button type="error" @click="$toast.error({ content: '只有 2 秒' })">
    正常时长
  </Button>
  <Button
    type="success"
    @click="$toast.success({ content: '持续 5 秒', closable: true, duration: 5000 })"
  >
    持续5秒
  </Button>
  <Button
    type="primary"
    @click="$toast.loading({ content: '一直持续', closable: true, duration: 0 })"
  >
    一直持续
  </Button>
</template>
