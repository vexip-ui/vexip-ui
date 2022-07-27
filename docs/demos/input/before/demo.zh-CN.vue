<template>
  <Input v-model:value="value1" placeholder="vexip-ui" style="max-width: 420px;">
    <template #before>
      http://
    </template>
    <template #after>
      .com
    </template>
  </Input>
  <br />
  <br />
  <Input v-model:value="value2" placeholder="vexip-ui" style="max-width: 420px;">
    <template #before>
      <Select v-model:value="protocol" :options="['http://', 'https://']"></Select>
    </template>
    <template #after>
      <Select v-model:value="service" :options="['.com', '.cn', '.net', '.org']"></Select>
    </template>
  </Input>
  <br />
  <br />
  <Input v-model:value="value3" placeholder="vexip-ui" style="max-width: 420px;">
    <template #before-button>
      <Button :icon="MagnifyingGlass"></Button>
    </template>
  </Input>
  <br />
  <br />
  <Input v-model:value="value3" placeholder="vexip-ui" style="max-width: 420px;">
    <template #after-button>
      <Button :icon="MagnifyingGlass"></Button>
    </template>
  </Input>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MagnifyingGlass } from '@vexip-ui/icons'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')

const protocol = ref('http://')
const service = ref('.com')
</script>
