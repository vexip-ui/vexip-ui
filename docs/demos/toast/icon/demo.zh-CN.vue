<template>
  <Button type="warning" @click="$toast.warning({ content: '自定义图标', icon: CircleQuestion })">
    自定义图标
  </Button>
  <Button type="success" @click="showCustomizedIconToast">
    函数渲染图标
  </Button>
</template>

<script setup lang="ts">
import { h } from 'vue'

import { Icon, Toast } from 'vexip-ui'
import { CircleQuestion, Share } from '@vexip-ui/icons'

function showCustomizedIconToast() {
  Toast.success({
    content: '函数渲染图标',
    icon: () =>
      h(Icon, {
        icon: Share
      })
  })
}
</script>
