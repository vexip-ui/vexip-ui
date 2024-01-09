<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'

// import { isClient } from '@vexip-ui/utils'

defineOptions({ name: 'Portal' })

const props = defineProps({
  to: {
    type: String,
    default: ''
  }
})

const testMode = import.meta.env.MODE === 'test'
const isMounted = ref(false)
const disabled = computed(() => !isMounted.value || !props.to)

onMounted(() => {
  nextTick(() => {
    isMounted.value = true
  })
})
</script>

<template>
  <Teleport
    v-if="testMode ? !disabled : isMounted"
    :to="disabled ? undefined : to || undefined"
    :disabled="disabled"
  >
    <slot></slot>
  </Teleport>
  <slot v-else></slot>
</template>
