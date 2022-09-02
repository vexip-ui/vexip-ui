<template>
  <Button type="primary" @click="expanded = !expanded">
    {{ expanded ? 'Collapse' : 'Expand' }}
  </Button>
  <br />
  <CollapseTransition>
    <p v-show="expanded">
      Some custom collapse content
    </p>
  </CollapseTransition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const expanded = ref(true)
</script>
