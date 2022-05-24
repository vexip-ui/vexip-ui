<template>
  <TimeAgo :datetime="datetime" title></TimeAgo>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      datetime: '2021-07-07 08:17:00'
    }
  }
})
</script>
