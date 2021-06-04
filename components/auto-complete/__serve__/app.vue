<template>
  <AutoComplete filter ignore-case :options="options"></AutoComplete>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AutoComplete from '../auto-complete.vue'

export default defineComponent({
  name: 'App',
  components: {
    AutoComplete
  },
  data() {
    return {
      value: null,
      options: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
        { label: '选项3', value: 3 },
        { label: '选项4', value: 4 },
        { label: '选项5', value: 5 },
        { label: '选项6', value: 6 },
        { label: '选项7', value: 7 },
        { label: '选项8', value: 8 },
        { label: '选项9', value: 9 },
        { label: '选项10', value: 10 },
        { label: '选项11', value: 11 },
        { label: '选项12', value: 12 }
      ]
    }
  }
})
</script>

<style lang="scss">
.vxp-auto-complete {
  width: 300px;
}
</style>
