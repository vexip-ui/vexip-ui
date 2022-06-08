<template>
  <Avatar :icon="User"></Avatar>
  <Avatar circle :icon="User"></Avatar>
  <Avatar :icon="User" size="large" :icon-scale="2"></Avatar>
</template>

<script setup lang="ts">
import { User } from '@vexip-ui/icons'
</script>
