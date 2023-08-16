<template>
  <Teleport v-if="isMounted && to" :to="to">
    <slot></slot>
  </Teleport>
  <slot v-else></slot>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'Portal',
  props: {
    to: {
      type: String,
      default: ''
    }
  },
  setup() {
    const isMounted = ref(false)

    onMounted(() => {
      nextTick(() => {
        isMounted.value = true
      })
    })

    return {
      isMounted
    }
  }
})
</script>
