<template>
  <DatePicker
    v-model:value="date"
    is-range
    clearable
    type="month"
  ></DatePicker>
  <p>
    Current Date:
    <br />
    {{ date }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DatePicker from '../date-picker.vue'

export default defineComponent({
  name: 'App',
  components: {
    DatePicker
  },
  data() {
    return {
      date: null
    }
  }
})
</script>

<style lang="scss">
.vxp-date-picker {
  width: 380px;
}
</style>
