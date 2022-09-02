<template>
  <Button type="primary" @click="expanded = !expanded">
    {{ expanded ? '收起' : '展开' }}
  </Button>
  <br />
  <CollapseTransition>
    <p v-show="expanded">
      自定义折叠内容自定义折叠内容
    </p>
  </CollapseTransition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const expanded = ref(true)
</script>
