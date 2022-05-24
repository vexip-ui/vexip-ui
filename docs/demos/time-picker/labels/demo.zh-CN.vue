<template>
  <TimePicker
    v-model:value="time"
    separator=""
    :labels="{
      hour: '时',
      minute: '分',
      second: '秒'
    }"
    style="width: 220px;"
  ></TimePicker>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const time = ref('')

    return { time }
  }
})
</script>
