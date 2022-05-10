<template>
  <Row align="middle">
    <RadioGroup v-model:value="placement">
      <Radio label="top"></Radio>
      <Radio label="right"></Radio>
      <Radio label="bottom"></Radio>
      <Radio label="left"></Radio>
    </RadioGroup>
    <Button type="primary" @on-click="active = !active">
      打开
    </Button>
    <Drawer
      v-model:active="active"
      transfer
      resizable
      :title="`${placement} 抽屉`"
      :placement="placement"
    >
      <p>一些内容</p>
      <p>一些内容</p>
      <p>一些内容</p>
    </Drawer>
  </Row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/button'
import { Radio } from '@/components/radio'
import { RadioGroup } from '@/components/radio-group'
import { Row } from '@/components/row'
import Drawer from '../drawer.vue'

const active = ref(false)
const placement = ref<'top' | 'right' | 'bottom' | 'left'>('right')
</script>
