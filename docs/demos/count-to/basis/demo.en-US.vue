<template>
  <Space vertical>
    <CountTo ref="countTo" class="count-to" v-bind="propsModel">
      <template #prefix>
        <ArrowUp></ArrowUp>
      </template>
    </CountTo>
    <Form :model="propsModel" style="max-width: 300px;">
      <FormItem prop="start" label="start">
        <NumberInput></NumberInput>
      </FormItem>
      <FormItem prop="end" label="end">
        <NumberInput></NumberInput>
      </FormItem>
      <FormItem prop="duration" label="duration">
        <NumberInput></NumberInput>
      </FormItem>
      <FormItem prop="decimals" label="decimals">
        <NumberInput></NumberInput>
      </FormItem>
      <FormItem prop="separator" label="separator">
        <Input></Input>
      </FormItem>
      <FormItem prop="prefix" label="prefix">
        <Input></Input>
      </FormItem>
      <FormItem prop="suffix" label="suffix">
        <Input></Input>
      </FormItem>
      <FormItem prop="timing" label="timing">
        <Select :options="timingOptions"></Select>
      </FormItem>
      <FormItem action>
        <Button type="primary" @click="start">
          Start
        </Button>
        <Button type="primary" @click="pause">
          Pause
        </Button>
        <Button type="primary" @click="resume">
          Continue
        </Button>
        <Button type="primary" @click="toggle">
          Toggle
        </Button>
      </FormItem>
    </Form>
  </Space>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

import type { CountTo, CountToTimingName } from 'vexip-ui'

const countTo = ref<InstanceType<typeof CountTo>>()

const timingOptions: CountToTimingName[] = ['linear', 'easeOut']

const propsModel = reactive({
  start: 0,
  end: 11.82,
  duration: 3000,
  decimals: 4,
  separator: ',',
  prefix: '',
  suffix: '%',
  timing: timingOptions[0]
})

function start() {
  countTo.value!.start()
}

function pause() {
  countTo.value!.pause()
}

function resume() {
  countTo.value!.resume()
}

function toggle() {
  countTo.value!.toggle()
}
</script>

<style scoped>
.count-to {
  font-size: 2.5rem;
  color: rgb(63, 134, 0);
}

.count-to svg {
  width: 30px;
  height: 30px;
  fill: rgb(63, 134, 0);
}
</style>
