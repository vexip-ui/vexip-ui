<template>
  <Viewer
    width="1000"
    height="500"
    :actions="actions"
    :action-layout="actionLayout"
  >
    <div :style="{ filter: `contrast(${contrast}%)` }">
      <img src="https://www.vexipui.com/picture-1.jpg" />
    </div>
    <template #action-contrast="{ state }">
      <Tooltip
        :visible="state.contrast"
        trigger="custom"
        reverse
        no-arrow
        tip-style="margin-bottom: 6px"
      >
        <template #trigger>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
            "
          >
            <Icon>
              <CircleHalfStroke></CircleHalfStroke>
            </Icon>
          </div>
        </template>
        <Slider v-model:value="contrast" sync style="width: 200px">
          <template #tip="{ value }">
            {{ `${value}%` }}
          </template>
        </Slider>
      </Tooltip>
    </template>
  </Viewer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { viewerDefaultActionLayout } from 'vexip-ui'
import { CircleHalfStroke } from '@vexip-ui/icons'

import type { ViewerToolbarAction } from 'vexip-ui'

const contrast = ref(100)

const actions: ViewerToolbarAction[] = [
  {
    name: 'contrast',
    process: state => {
      state.contrast = !state.contrast
    }
  }
]

const actionLayout = [...viewerDefaultActionLayout, ['contrast']]
</script>
