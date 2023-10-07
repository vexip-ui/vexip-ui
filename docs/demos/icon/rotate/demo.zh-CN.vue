<template>
  <Icon :icon="ArrowUp" rotate="-90deg"></Icon>
  <Icon :icon="ArrowUp"></Icon>
  <Icon :icon="ArrowUp" rotate="1"></Icon>
  <Icon :icon="ArrowUp" :rotate="-3"></Icon>
  <Icon :icon="ArrowUp" rotate="+0.5turn"></Icon>
  <Icon :icon="ArrowUp" rotate="100grad"></Icon>
  <Icon :icon="ArrowUp" rotate="-1.5708rad"></Icon>
  <Icon :icon="Plus" style="margin: 0 6px"></Icon>
  <Icon :icon="A"></Icon>
</template>

<script setup lang="ts">
import { A, ArrowUp, Plus } from '@vexip-ui/icons'
</script>
