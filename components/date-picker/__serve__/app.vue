<template>
  <DatePicker v-model:value="date" clearable type="date"></DatePicker>
  <p>
    Current Date:
    <br />
    {{ date }}
  </p>
  <DatePicker
    v-model:value="dateRange"
    is-range
    clearable
    type="date"
  ></DatePicker>
  <p>
    Current Date Range:
    <br />
    {{ dateRange }}
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import DatePicker from '../date-picker.vue'

export default defineComponent({
  name: 'App',
  components: {
    DatePicker
  },
  setup() {
    const date = ref<string>('')
    const dateRange = ref<string[]>([])

    return {
      date,
      dateRange
    }
  }
})
</script>

<style lang="scss">
.vxp-date-picker {
  width: 380px;
}
</style>
