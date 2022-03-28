<template>
  <div style="padding: 60px;">
    <Calendar></Calendar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Calendar } from '..'

export default defineComponent({
  name: 'App',
  components: {
    Calendar
  },
  data() {
    return {}
  }
})
</script>

<style lang="scss"></style>
