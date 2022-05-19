
<template>
  <DatePicker
    v-model:value="yearRange"
    is-range
    type="year"
    style="width: 220px;"
  ></DatePicker>
  <p>
    Current Year Range: {{ yearRange }}
  </p>
  <DatePicker
    v-model:value="dateRange"
    is-range
    type="datetime"
    style="width: 380px;"
  ></DatePicker>
  <p>
    Current Date Range: {{ dateRange }}
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const yearRange = ref<number[]>([])
    const dateRange = ref<string[]>([])

    return { yearRange, dateRange }
  }
})
</script>
