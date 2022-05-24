<template>
  <DatePicker
    v-model:value="date"
    date-separator=""
    :labels="{
      year: '年',
      month: '月',
      date: '日'
    }"
    style="width: 220px;"
  ></DatePicker>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const date = ref('')

    return { date }
  }
})
</script>
