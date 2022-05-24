<template>
  <div style="height: 200px;">
    <Slider v-model:value="value" vertical></Slider>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref(40)

    return { value }
  }
})
</script>
