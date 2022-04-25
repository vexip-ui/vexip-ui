<template>
  <Wheel v-model:value="value" pointer arrow>
    <WheelItem
      v-for="item in items"
      :key="item"
      :value="item"
      :disabled="item < 3 || item === 9 || item === 10 || item > 18"
    >
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
import { defineComponent } from 'vue'
import Wheel from '../wheel.vue'
import WheelItem from '../wheel-item.vue'
import { range } from '@vexip-ui/utils'

export default defineComponent({
  name: 'App',
  components: {
    Wheel,
    WheelItem
  },
  data() {
    return {
      value: 1,
      items: range(20)
    }
  }
})
</script>

<style lang="scss"></style>
