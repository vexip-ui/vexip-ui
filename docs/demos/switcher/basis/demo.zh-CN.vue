<template>
  <Switcher v-model:value="checked"></Switcher>
  <br />
  <p style="margin-top: 10px;">
    checked: {{ checked }}
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(false)

    return { checked }
  }
})
</script>
