<template>
  <p style="margin-bottom: 28px">
    <span>翻转：</span>
    <Switch v-model:value="flip" style="margin-right: 10px"></Switch>
    <span>交替：</span>
    <Switch v-model:value="alternate"></Switch>
  </p>
  <Timeline
    horizontal
    :flip="flip"
    :alternate="alternate"
    pending
  >
    <TimelineItem>
      <span>时间节点 1</span>
    </TimelineItem>
    <TimelineItem>
      <span>时间节点 2</span>
    </TimelineItem>
    <TimelineItem>
      <span>时间节点 3</span>
    </TimelineItem>
    <TimelineItem>
      <span>时间节点 4</span>
    </TimelineItem>
    <TimelineItem>
      <span>时间节点 5</span>
    </TimelineItem>
  </Timeline>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const flip = ref(false)
const alternate = ref(false)
</script>

<style scoped>
.vxp-timeline__item {
  white-space: nowrap;
}
</style>
