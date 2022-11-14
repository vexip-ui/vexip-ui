<template>
  <Button @click="$toast.open('一般提示')">
    一般提示
  </Button>
  <Button type="success" @click="$toast.success('成功提示')">
    成功提示
  </Button>
  <Button type="warning" @click="$toast.warning('警告提示')">
    警告提示
  </Button>
  <Button type="error" @click="$toast.error('错误提示')">
    错误提示
  </Button>
  <Button type="primary" @click="$toast.loading('加载中...')">
    加载提示
  </Button>
</template>
