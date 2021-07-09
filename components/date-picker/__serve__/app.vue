<template>
  <DatePicker
    v-model:value="dateRange"
    is-range
    clearable
    type="date"
  ></DatePicker>
  <p>
    Current Date:
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
    const dateRange = ref<string[]>([])

    return {
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
