<template>
  <TimePicker v-model:value="time" clearable></TimePicker>
  <p>
    Current Time:
    <br />
    {{ time }}
  </p>
  <TimePicker
    v-model:value="timeRange"
    is-range
    clearable
    :shortcuts="shortcuts"
  ></TimePicker>
  <p>
    Current Time Range:
    <br />
    {{ timeRange }}
  </p>
  <TimePicker disabled clearable></TimePicker>
  <br />
  <br />
  <TimePicker disabled is-range clearable></TimePicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TimePicker } from '..'

const time = ref('09:48:23')
const timeRange = ref<string[]>([])
const shortcuts = ref([
  { name: 'Noon', value: '12:00:00' }
])
</script>

<style lang="scss">
.vxp-time-picker {
  width: 300px;
}
</style>
