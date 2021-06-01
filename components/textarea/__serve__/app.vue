<template>
  <Textarea></Textarea>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Textarea from '../textarea.vue'

export default defineComponent({
  name: 'App',
  components: {
    Textarea
  }
})
</script>

<style lang="scss">
.vxp-textarea {
  width: 300px;
}
</style>
