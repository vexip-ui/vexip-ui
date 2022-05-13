<template>
  <div style="padding: 60px;">
    <Calendar :disabled-date="disabledDate"></Calendar>
  </div>
</template>

<script setup lang="ts">
import { Calendar } from '..'

function disabledDate(date: Date) {
  return date.getDate() === 18
}
</script>
