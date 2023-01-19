<template>
  <Space vertical>
    <Image width="200" height="120" skeleton></Image>
    <Image
      width="200"
      height="120"
      :skeleton="{
        activated: false,
        iconScale: 3.6,
        imageIcon: LemonR
      }"
    ></Image>
    <Image width="200" height="120" placeholder="别急，再等等..."></Image>
  </Space>
</template>

<script setup lang="ts">
import { LemonR } from '@vexip-ui/icons'
</script>
