<template>
  <br />
  <br />
  <Badge :content="11" @on-badge-click="handleClick">
    <Button>消息</Button>
  </Badge>
  <br />
  <br />
  <div v-for="(type) in types" :key="type" style="margin-bottom: 8px;">
    <Badge is-dot :type="type" :content="4"></Badge>
    {{ type.charAt(0).toLocaleUpperCase() + type.substring(1) }}
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/button'
import { Badge } from '..'

const types = [
  'error',
  'primary',
  'success',
  'warning',
  'info',
  'disabled'
] as const

function handleClick() {
  console.log('click')
}
</script>
