<template>
  <footer :class="prefix"></footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Footer',
  setup() {
    return {
      prefix: 'vxp-footer'
    }
  }
})
</script>
