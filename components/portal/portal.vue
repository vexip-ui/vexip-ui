<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'

defineOptions({ name: 'Portal' })

const props = defineProps({
  to: {
    type: String,
    default: ''
  }
})

const isMounted = ref(false)
const disabled = computed(() => !isMounted.value || !props.to)

onMounted(() => {
  nextTick(() => {
    isMounted.value = true
  })
})
</script>

<template>
  <Teleport v-if="isMounted" :to="disabled ? undefined : to || undefined" :disabled="disabled">
    <slot></slot>
  </Teleport>
  <slot v-else></slot>
</template>
