<template>
  <Space vertical style="max-width: 400px;">
    <Slider :value="42" :markers="markers" marker-only></Slider>
    <Slider
      :value="[42, 68]"
      range
      :markers="markers"
      marker-only
    ></Slider>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const markers = ref({
  0: '0°C',
  42: '42°C',
  68: {
    style: 'color: #fbc037',
    label: '68°C'
  },
  100: {
    style: {
      color: '#f03e3e'
    },
    label: '100°C'
  }
})
</script>
