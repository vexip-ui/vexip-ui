<template>
  <Image src="error" fallback-src="/picture-2.jpg" width="300"></Image>
  <Image src="error" width="300" error-tip="Error"></Image>
  <Image src="error" width="300">
    <template #error>
      <Icon :scale="3">
        <FaceFrownOpenR></FaceFrownOpenR>
      </Icon>
    </template>
  </Image>
</template>

<script setup lang="ts">
import { FaceFrownOpenR } from '@vexip-ui/icons'
</script>
