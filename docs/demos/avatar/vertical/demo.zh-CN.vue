<template>
  <AvatarGroup
    :options="options"
    :offset="12"
    circle
    vertical
  ></AvatarGroup>
  <AvatarGroup
    :options="options"
    :max="3"
    circle
    vertical
    style="margin-left: 20px"
  ></AvatarGroup>
</template>

<script setup lang="ts">
import { User } from '@vexip-ui/icons'

const options = [
  { src: 'https://www.vexipui.com/qmhc.jpg' },
  { icon: User },
  { text: 'Qmhc' },
  { text: '张三' },
  { text: '李四' }
]
</script>
