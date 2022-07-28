<template>
  <Input placeholder="vexip-ui" style="max-width: 420px;">
    <template #before>
      http://
    </template>
    <template #after>
      .com
    </template>
  </Input>
  <br />
  <br />
  <Input placeholder="vexip-ui" style="max-width: 420px;">
    <template #before>
      <Select v-model:value="protocol" :options="['http://', 'https://']"></Select>
    </template>
    <template #after>
      <Select v-model:value="service" :options="['.com', '.cn', '.net', '.org']"></Select>
    </template>
  </Input>
  <br />
  <br />
  <Input placeholder="vexip-ui" style="max-width: 420px;">
    <template #before-button>
      <Button :icon="MagnifyingGlass"></Button>
    </template>
  </Input>
  <br />
  <br />
  <Input placeholder="vexip-ui" style="max-width: 420px;">
    <template #after-button>
      <Button type="primary" :icon="MagnifyingGlass">
        搜索
      </Button>
    </template>
  </Input>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MagnifyingGlass } from '@vexip-ui/icons'

const protocol = ref('http://')
const service = ref('.com')
</script>
