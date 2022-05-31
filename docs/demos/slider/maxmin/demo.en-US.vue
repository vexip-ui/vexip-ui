<template>
  <Slider
    v-model:value="value"
    :min="50"
    :max="200"
    style="width: 400px;"
  ></Slider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref(60)

    return { value }
  }
})
</script>
