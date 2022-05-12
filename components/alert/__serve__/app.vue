<template>
  <template v-for="(type) in types" :key="type">
    <Alert icon closable :type="type">
      警告提示的内容
    </Alert>
  </template>
  <template v-for="(type) in types" :key="type">
    <Alert
      icon
      closable
      :type="type"
      title="警告标题"
    >
      警告提示的内容
    </Alert>
  </template>
</template>

<script setup lang="ts">
import { Alert } from '..'

const types = ['default', 'primary', 'info', 'success', 'warning', 'error'] as const
</script>
