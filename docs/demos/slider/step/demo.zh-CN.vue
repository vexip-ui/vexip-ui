<template>
  <Slider
    v-model:value="value"
    :step="5"
    :max="100"
    :min="-50"
    style="max-width: 400px;"
  ></Slider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref(20)

    return { value }
  }
})
</script>
