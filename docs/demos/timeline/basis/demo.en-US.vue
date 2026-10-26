<template>
  <Timeline>
    <TimelineItem v-for="(itemType, index) in types" :key="index" :type="itemType">
      <span>{{ `Timeline node ${index + 1}` }}</span>
    </TimelineItem>
  </Timeline>
</template>

<script setup lang="ts">
const types = ['primary', 'info', 'success', 'warning', 'error', 'disabled'] as const
</script>
