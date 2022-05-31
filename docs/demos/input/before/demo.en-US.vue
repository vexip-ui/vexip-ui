<template>
  <Input
    v-model:value="value1"
    placeholder="vexip-ui"
    style="width: 420px;"
  >
    <template #before>
      http://
    </template>
    <template #after>
      .com
    </template>
  </Input>
  <br />
  <br />
  <Input
    v-model:value="value2"
    placeholder="vexip-ui"
    style="width: 420px;"
  >
    <template #before>
      <Select v-model:value="protocol">
        <Option>http://</Option>
        <Option>https://</Option>
      </Select>
    </template>
    <template #after>
      <Select v-model:value="service">
        <Option>.com</Option>
        <Option>.cn</Option>
        <Option>.net</Option>
        <Option>.org</Option>
      </Select>
    </template>
  </Input>
  <br />
  <br />
  <Input
    v-model:value="value3"
    placeholder="vexip-ui"
    style="width: 420px;"
  >
    <template #after>
      <Icon><Cog></Cog></Icon>
    </template>
  </Input>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Cog } from '@vexip-ui/icons'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')

const protocol = 'http://'
const service = '.com'
</script>
