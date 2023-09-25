<template>
  <p>
    Disabled:
    <Switch v-model:value="disabled"></Switch>
  </p>
  <Space vertical style="max-width: 400px; margin-bottom: 20px">
    <Slider :value="56" :disabled="disabled" :markers="markers"></Slider>
    <Slider
      :value="[28, 56]"
      :min="-50"
      :max="150"
      range
      :disabled="disabled"
      :markers="markers"
    ></Slider>
  </Space>
  <Space :size="[24, 16]" :disabled="disabled" style="height: 200px; margin-bottom: 20px">
    <Slider
      :value="56"
      vertical
      :disabled="disabled"
      :markers="markers"
    ></Slider>
    <Slider
      :value="[28, 56]"
      vertical
      range
      :disabled="disabled"
      :markers="markers"
    ></Slider>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(false)

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
