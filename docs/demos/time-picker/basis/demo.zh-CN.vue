<template>
  <TimePicker v-model:value="time" style="width: 220px;"></TimePicker>
  <p>
    Current Time: {{ time }}
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const time = ref('09:24:47')

    return { time }
  }
})
</script>
