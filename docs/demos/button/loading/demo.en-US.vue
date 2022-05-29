<template>
  <Button loading type="primary">
    Loading
  </Button>
  <Button
    type="primary"
    :loading="loading"
    @click="load"
  >
    Click me
  </Button>
  <Button
    loading
    circle
    type="primary"
  >
    Loading
  </Button>
  <Button
    loading
    circle
    type="primary"
  ></Button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const loading = ref(false)

    function load() {
      loading.value = true

      setTimeout(() => {
        loading.value = false
      }, 3000)
    }

    return { loading, load }
  }
})
</script>
