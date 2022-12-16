<template>
  <Image width="200" height="120" skeleton></Image>
  <br />
  <br />
  <Image
    width="200"
    height="120"
    :skeleton="{
      activated: false,
      iconScale: 3.6,
      imageIcon: LemonR
    }"
  ></Image>
</template>

<script setup lang="ts">
import { LemonR } from '@vexip-ui/icons'
</script>
