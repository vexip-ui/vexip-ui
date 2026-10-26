<template>
  <div>
    <Button type="primary" :icon="Search">
      {{ msg }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from 'lucide-vue-next'

const msg = ref('Hello World!')
</script>
