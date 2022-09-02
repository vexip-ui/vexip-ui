<template>
  <Button type="error" @click="$toast.error({ content: '上方提示', position: 'top' })">
    上方提示
  </Button>
  <Button type="success" @click="$toast.success({ content: '中间提示' })">
    中间提示
  </Button>
  <Button type="warning" @click="$toast.warning({ content: '下方提示', position: 'bottom' })">
    下方提示
  </Button>
</template>
