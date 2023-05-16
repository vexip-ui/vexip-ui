<template>
  <div>
    <Button type="primary" :icon="MagnifyingGlass">
      {{ msg }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { MagnifyingGlass } from '@vexip-ui/icons'

const msg = ref('Hello World!')
</script>
