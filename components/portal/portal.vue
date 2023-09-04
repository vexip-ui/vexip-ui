<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

defineOptions({ name: 'Portal' })

defineProps({
  to: {
    type: String,
    default: ''
  }
})

const isMounted = ref(false)

onMounted(() => {
  nextTick(() => {
    isMounted.value = true
  })
})
</script>

<template>
  <Teleport v-if="isMounted && to" :to="to">
    <slot></slot>
  </Teleport>
  <slot v-else></slot>
</template>
