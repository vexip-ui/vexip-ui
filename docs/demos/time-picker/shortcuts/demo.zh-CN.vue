<template>
  <TimePicker :shortcuts="singleShortcuts" clearable style="max-width: 300px;"></TimePicker>
  <br />
  <br />
  <TimePicker
    is-range
    :shortcuts="multipleShortcuts"
    clearable
    style="max-width: 300px;"
  ></TimePicker>
</template>

<script setup lang="ts">
const singleShortcuts = [
  { name: '上班', value: '08:00:00' },
  { name: '下班', value: () => '18:00:00' }
]

const multipleShortcuts = [
  { name: '上午', value: ['08:00:00', '12:00:00'] },
  { name: '下午', value: () => ['14:00:00', '18:00:00'] }
]
</script>
