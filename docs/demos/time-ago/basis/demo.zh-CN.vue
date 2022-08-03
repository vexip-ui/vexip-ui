<template>
  <template v-for="datetime in datetimes" :key="datetime">
    <TimeAgo :datetime="datetime" title></TimeAgo>
    <br />
  </template>
</template>

<script setup lang="ts">
import { addMinutes, addHours, addDays } from '@vexip-ui/utils'

const datetimes = [
  Date.now(),
  Date.now() - 10000,
  addMinutes(Date.now(), -1),
  addMinutes(Date.now(), -2),
  addHours(Date.now(), -1),
  addHours(Date.now(), -2),
  addDays(Date.now(), -1),
  addDays(Date.now(), -3),
  addDays(Date.now(), -32),
  addDays(Date.now(), -93),
  addDays(Date.now(), -366),
  addDays(Date.now(), -732)
]
</script>
