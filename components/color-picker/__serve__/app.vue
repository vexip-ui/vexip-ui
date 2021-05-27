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
import { defineComponent } from 'vue'
import ColorPicker from '../color-picker.vue'

export default defineComponent({
  name: 'App',
  components: {
    ColorPicker
  },
  data() {
    return {
      color: null
    }
  }
})
</script>

<style lang="scss"></style>
