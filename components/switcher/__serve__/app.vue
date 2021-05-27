<template>
  <Switcher v-model:value="checked"></Switcher>
  <p>
    Switcher Value:
    <br />
    {{ checked }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Switcher from '../switcher.vue'

export default defineComponent({
  name: 'App',
  components: {
    Switcher
  },
  data() {
    return {
      checked: false
    }
  }
})
</script>

<style lang="scss"></style>
