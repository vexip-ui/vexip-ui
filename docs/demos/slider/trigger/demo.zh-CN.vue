<template>
  <div style="max-width: 400px">
    <Slider :value="25">
      <template #trigger="{ value }">
        <Icon :icon="Heart" :scale="1.4" :style="{ color: value < 30 ? 'cyan' : 'red' }"></Icon>
      </template>
    </Slider>
  </div>
</template>

<script setup lang="ts">
import { Heart } from '@vexip-ui/icons'
</script>
