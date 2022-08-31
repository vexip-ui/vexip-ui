<template>
  <Button type="primary" @click="toast">
    Open
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    toast() {
      this.$toast.open('Some tips')
    }
  }
})
</script>
