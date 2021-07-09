<template>
  <Progress :percentage="percentage"></Progress>
  <div style="padding-top: 30px;">
    <Progress info-type="bubble-top" :percentage="50"></Progress>
  </div>
  <Progress
    info-type="inside"
    :percentage="30"
    :stroke-width="20"
    style="width: 500px;"
  >
    百分之30
  </Progress>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Progress from '../progress.vue'

export default defineComponent({
  name: 'App',
  components: {
    Progress
  },
  setup() {
    const percentage = ref(40)

    return {
      percentage
    }
  }
})
</script>

<style lang="scss">
.vxp-progress {
  width: 500px;
}
</style>
