<template>
  <ColorPicker
    v-model:value="color"
    alpha
    shortcut
    clearable
  ></ColorPicker>
  <p>
    Color Value:
    <br />
    {{ color }}
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ColorPicker } from '..'

export default defineComponent({
  name: 'App',
  components: {
    ColorPicker
  },
  setup() {
    const color = ref('rgba(51, 154, 240, 0.6)')

    return {
      color
    }
  }
})
</script>
