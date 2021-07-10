<template>
  <div style="width: 400px; padding-top: 60px;">
    <Slider
      v-model:value="value"
      :step="5"
      :max="100"
      :min="-50"
    ></Slider>
  </div>
  <p>
    Slider Value:
    <br />
    {{ value }}
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Slider } from '..'

export default defineComponent({
  name: 'App',
  components: {
    Slider
  },
  setup() {
    const value = ref(20)

    return {
      value
    }
  }
})
</script>
