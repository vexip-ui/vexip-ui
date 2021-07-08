<template>
  <TimeAgo datetime="2021-07-07 08:17:00" title></TimeAgo>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TimeAgo } from '..'

export default defineComponent({
  name: 'App',
  components: {
    TimeAgo
  },
  setup() {
    return {}
  }
})
</script>
