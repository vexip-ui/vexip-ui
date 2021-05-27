<template>
  <Timeline both-sides style="width: 500px;">
    <TimelineItem>
      <p>项目负责人</p>
      <Card> 今日客户提出了XXX的需求，请及时做技术可行性分析 </Card>
    </TimelineItem>
    <TimelineItem>
      <p>技术负责人</p>
      <Card> 经过会议讨论，XXX需求可以实现，请实施人员跟进 </Card>
    </TimelineItem>
    <TimelineItem>
      <p>技术骨干</p>
      <Card> 已收到开发需求，目前开发进度为30% </Card>
    </TimelineItem>
    <TimelineItem>
      <p>项目负责人</p>
      <Card> 请及时跟进XXX需求开发，目前客户对这块的进度提出了疑问 </Card>
    </TimelineItem>
    <TimelineItem>
      <p>技术负责人</p>
      <Card> 收到，已及时跟进开发情况，增加开发人员投入 </Card>
    </TimelineItem>
  </Timeline>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Card } from '@/components/card'
import Timeline from '../timeline.vue'
import TimelineItem from '../timeline-item.vue'

export default defineComponent({
  name: 'App',
  components: {
    Card,
    Timeline,
    TimelineItem
  },
  data() {
    return {}
  }
})
</script>

<style lang="scss"></style>
