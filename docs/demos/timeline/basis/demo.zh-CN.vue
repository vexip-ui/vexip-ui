<template>
  <Timeline>
    <TimelineItem v-for="(itemType, index) in types" :key="index" :type="itemType">
      <span>{{ `时间节点 ${index + 1}` }}</span>
    </TimelineItem>
  </Timeline>
</template>

<script setup lang="ts">
const types = ['primary', 'info', 'success', 'warning', 'error', 'disabled'] as const
</script>
