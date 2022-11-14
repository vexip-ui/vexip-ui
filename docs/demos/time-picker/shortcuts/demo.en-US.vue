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
  { name: 'Work', value: '08:00:00' },
  { name: 'Off Work', value: () => '18:00:00' }
]

const multipleShortcuts = [
  { name: 'Morning', value: ['08:00:00', '12:00:00'] },
  { name: 'Afternoon', value: () => ['14:00:00', '18:00:00'] }
]
</script>
