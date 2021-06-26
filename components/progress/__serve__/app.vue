<template>
  <Progress :percentage="percentage"></Progress>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Progress from '../progress.vue'

export default defineComponent({
  name: 'App',
  components: {
    Progress
  },
  data() {
    return {
      percentage: 60
    }
  }
})
</script>

<style lang="scss">
.vxp-select {
  width: 300px;
}
</style>
