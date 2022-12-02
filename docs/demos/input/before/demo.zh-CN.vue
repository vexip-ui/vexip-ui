<template>
  <Space vertical>
    <Input placeholder="vexip-ui">
      <template #before>
        http://
      </template>
      <template #after>
        .com
      </template>
    </Input>
    <Input placeholder="vexip-ui">
      <template #after-action>
        <Button type="primary" :icon="MagnifyingGlass">
          搜索
        </Button>
      </template>
    </Input>
    <Input size="large" placeholder="vexip-ui">
      <template #before-action>
        <Select v-model:value="protocol" :options="['http://', 'https://']"></Select>
      </template>
      <template #after-action>
        <Select v-model:value="service" :options="['.com', '.cn', '.net', '.org']"></Select>
      </template>
    </Input>
    <Input placeholder="vexip-ui">
      <template #before-action>
        <Button>Before</Button>
      </template>
      <template #after-action>
        <Button>After</Button>
      </template>
    </Input>
    <Input size="small" placeholder="vexip-ui">
      <template #before-action>
        <Input style="max-width: 72px;"></Input>
      </template>
      <template #after-action>
        <Input style="max-width: 72px;"></Input>
      </template>
    </Input>
    <Input size="large" placeholder="vexip-ui">
      <template #before-action>
        <NumberInput style="max-width: 100px;"></NumberInput>
      </template>
      <template #after-action>
        <NumberInput style="max-width: 100px;"></NumberInput>
      </template>
    </Input>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MagnifyingGlass } from '@vexip-ui/icons'

const protocol = ref('http://')
const service = ref('.com')
</script>

<style scoped>
.vxp-input-wrapper {
  max-width: 420px;
}
</style>
