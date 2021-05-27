<template>
  <Button>Default</Button>
  <Button type="primary">
    Primary
  </Button>
  <Button type="dashed">
    Dashed
  </Button>
  <Button type="text">
    Text
  </Button>
  <Button type="info">
    Info
  </Button>
  <Button type="success">
    Success
  </Button>
  <Button type="warning">
    Warning
  </Button>
  <Button type="error">
    Error
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '../button.vue'

export default defineComponent({
  name: 'App',
  components: {
    Button
  }
})
</script>

<style lang="scss"></style>
