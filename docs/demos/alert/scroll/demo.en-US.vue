<template>
  <Alert scroll type="info">
    {{ text }}
  </Alert>
  <Alert scroll type="success" :icon="Bullhorn">
    {{ texts[0] }}
  </Alert>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { Bullhorn } from '@vexip-ui/icons'

const texts = [
  'Time with force, heaven and earth to ship it to the hero is not free.',
  'The way to be happy is to make others happy.',
]

const count = ref(0)
const text = computed(() => texts[count.value % texts.length])
</script>

<style scoped>
.vxp-alert {
  max-width: 600px;
}
</style>
