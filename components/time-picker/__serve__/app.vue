<template>
  <TimePicker v-model:value="time" clearable></TimePicker>
  <p>
    Current Time:
    <br />
    {{ time }}
  </p>
  <TimePicker v-model:value="timeRange" is-range clearable></TimePicker>
  <p>
    Current Time Range:
    <br />
    {{ timeRange }}
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TimePicker } from '..'

export default defineComponent({
  name: 'App',
  components: {
    TimePicker
  },
  setup() {
    const time = ref('09:48:23')
    const timeRange = ref<string[]>([])

    return {
      time,
      timeRange
    }
  }
})
</script>

<style lang="scss">
.vxp-time-picker {
  width: 300px;
}
</style>
