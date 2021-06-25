<template>
  <Dropdown v-model:visible="visible" transfer></Dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Dropdown from '../dropdown.vue'

export default defineComponent({
  name: 'App',
  components: {
    Dropdown
  },
  data() {
    return {
      visible: false
    }
  }
})
</script>
