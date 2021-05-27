<template>
  <Pagination
    v-model:active="active"
    page-jump
    page-total
    :total="100"
    :page-size="10"
    :max-count="8"
  ></Pagination>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Pagination from '../pagination.vue'

export default defineComponent({
  name: 'App',
  components: {
    Pagination
  },
  data() {
    return {
      active: 1
    }
  }
})
</script>

<style lang="scss">
.vxp-select {
  width: 300px;
}
</style>
