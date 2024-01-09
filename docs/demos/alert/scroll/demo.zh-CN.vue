<template>
  <Alert scroll type="info" @scroll-end="++count">
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
  '要使整个人生都过得舒适、愉快，这是不可能的，因为人类必须具备一种能应付逆境的态度。',
  '成功容易使人滋长骄傲情绪，在顺利的时候保持清醒的头脑是不容易的。'
]

const count = ref(0)
const text = computed(() => texts[count.value % texts.length])
</script>

<style scoped>
.vxp-alert {
  max-width: 600px;
}
</style>
