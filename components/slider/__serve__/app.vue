<template>
  <div style="width: 400px; padding-top: 60px;">
    <Slider v-model:value="value"></Slider>
  </div>
  <p>
    Slider Value:
    <br />
    {{ value }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Slider from '../slider.vue'

export default defineComponent({
  name: 'App',
  components: {
    Slider
  },
  data() {
    return {
      value: 0
    }
  }
})
</script>

<style lang="scss"></style>
