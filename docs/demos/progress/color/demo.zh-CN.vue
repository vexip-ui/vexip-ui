<template>
  <div style="max-width: 500px;">
    <Progress stroke-color="red" :percentage="45"></Progress>
    <Progress :stroke-color="['red', 'yellow']" :percentage="68"></Progress>
    <Progress :stroke-color="getColor" :percentage="54"></Progress>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    getColor(/* percentage: number */) {
      return 'cyan'
    }
  }
})
</script>
