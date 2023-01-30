<template>
  <Space vertical>
    <Image
      src="error"
      fallback-src="https://www.vexipui.com/picture-2.jpg"
      width="300"
      height="180"
    ></Image>
    <Image
      src="error"
      width="300"
      height="180"
      error-tip="Error"
    ></Image>
    <Image src="error" width="300" height="180">
      <template #error>
        <Icon :scale="3">
          <FaceFrownOpenR></FaceFrownOpenR>
        </Icon>
      </template>
    </Image>
  </Space>
</template>

<script setup lang="ts">
import { FaceFrownOpenR } from '@vexip-ui/icons'
</script>
