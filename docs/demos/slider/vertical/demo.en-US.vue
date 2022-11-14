<template>
  <Space style="height: 200px;">
    <Slider v-model:value="value" vertical></Slider>
    <Slider v-model:value="rangeValue" vertical range></Slider>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(40)
const rangeValue = ref([30, 60])
</script>
