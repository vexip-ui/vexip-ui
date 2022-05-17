<template>
  <div style="padding: 50px 100px;">
    <template v-for="pl in placements" :key="pl">
      <div style="display: flex; padding: 20px 60px;">
        <Tooltip trigger="click" :placement="pl" style="margin-right: 100px;">
          <Button type="primary" style="width: 120px;">
            {{ pl }}
          </Button>
          <template #tip>
            一些提示的内容
          </template>
        </Tooltip>
        <Tooltip
          transfer
          trigger="click"
          theme="dark"
          :placement="pl"
        >
          <Button type="info" style="width: 120px;">
            {{ pl }}
          </Button>
          <template #tip>
            一些提示的内容
          </template>
        </Tooltip>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/button'
import { Tooltip } from '..'

const placements = [
  'top-start',
  'top',
  'top-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'right-start',
  'right',
  'right-end',
  'left-start',
  'left',
  'left-end'
] as const
</script>
