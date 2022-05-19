<template>
  <div style="width: 400px;">
    <Slider v-model:value="value"></Slider>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref(0)

    return { value }
  }
})
</script>
