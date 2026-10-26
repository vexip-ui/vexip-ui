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
    <Image width="200" height="120" placeholder="Don't rush, wait..."></Image>
  </Space>
</template>

<script setup lang="ts">
import { LemonR } from '@vexip-ui/icons'
</script>
