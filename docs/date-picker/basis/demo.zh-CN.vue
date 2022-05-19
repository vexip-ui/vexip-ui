<template>
  <DatePicker v-model:value="date" style="width: 220px;"></DatePicker>
  <p>
    Current Date: {{ date }}
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const date = ref('2020-05-30')

    return { date }
  }
})
</script>
