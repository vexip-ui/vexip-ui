<template>
  <Wheel v-model:value="value" arrow>
    <WheelItem v-for="item in items" :key="item" :value="item">
      {{ item }}
    </WheelItem>
  </Wheel>
  <p>
    Wheel Value:
    <br />
    {{ value }}
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref(1)
    const items = Array.from({ length: 20 }, (_, index) => index + 1)

    return { value, items }
  }
})
</script>
