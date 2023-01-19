<template>
  <p>
    Filp:
    <Switch v-model:value="flip"></Switch>
  </p>
  <Timeline both-sides :flip="flip" style="max-width: 500px;">
    <TimelineItem>
      <span style="margin-bottom: 10px;">PM</span>
      <Card>
        Today, the customer put forward the demand of XXX, please do the technical feasibility
        analysis in time.
      </Card>
    </TimelineItem>
    <TimelineItem>
      <span style="margin-bottom: 10px;">CTO</span>
      <Card>
        After discussion at the meeting, XXX requirements can be realized, please follow up.
      </Card>
    </TimelineItem>
    <TimelineItem>
      <span style="margin-bottom: 10px;">Staff</span>
      <Card>
        The development needs have been received, and the current development progress is 30%.
      </Card>
    </TimelineItem>
    <TimelineItem>
      <span style="margin-bottom: 10px;">PM</span>
      <Card>
        Please follow up the development of XXX requirements in time. At present, customers have
        raised questions about the progress of this piece.
      </Card>
    </TimelineItem>
    <TimelineItem>
      <span style="margin-bottom: 10px;">CTO</span>
      <Card>
        Received, the development situation has been followed up in time, and the investment of
        developers has been increased.
      </Card>
    </TimelineItem>
  </Timeline>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const flip = ref(false)
</script>
