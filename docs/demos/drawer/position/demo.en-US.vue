<template>
  <Row align="middle">
    <RadioGroup v-model:value="placement">
      <Radio label="top"></Radio>
      <Radio label="right"></Radio>
      <Radio label="bottom"></Radio>
      <Radio label="left"></Radio>
    </RadioGroup>
    <Button type="primary" @click="active = !active">
      Open
    </Button>
    <Drawer
      v-model:active="active"
      transfer
      :title="`${placement} Drawer`"
      :placement="placement"
    >
      <p>Some content</p>
      <p>Some content</p>
      <p>Some content</p>
    </Drawer>
  </Row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Placement = 'right' | 'top' | 'bottom' | 'left'

const active = ref(false)
const placement = ref<Placement>('right')
</script>
