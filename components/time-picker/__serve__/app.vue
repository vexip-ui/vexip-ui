<template>
  <TimePicker v-model:value="time" is-range clearable></TimePicker>
  <p>
    Current Time:
    <br />
    {{ time }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TimePicker } from '..'

export default defineComponent({
  name: 'App',
  components: {
    TimePicker
  },
  data() {
    return {
      time: '09:48:23'
    }
  }
})
</script>

<style lang="scss">
.vxp-time-picker {
  width: 300px;
}
</style>
