<script setup lang="ts">
import { Dropdown } from '@/components/dropdown'
import { DropdownList } from '@/components/dropdown-list'
import { Renderer } from '@/components/renderer'

import { reactive, ref } from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { useRtl } from '@vexip-ui/hooks'
import { isFunction } from '@vexip-ui/utils'
import { renderItem } from './render'

import type { ContextmenuConfig, ContextmenuOptions, Key } from './symbol'

defineOptions({ name: 'Contextmenu' })

const nh = useNameHelper('contextmenu')
const { isRtl } = useRtl()
const visible = ref(false)
const configs = ref<ContextmenuConfig[]>([])
const appear = ref(false)

const position = reactive({
  x: 0,
  y: 0
})

const onSelect = ref<((keys: Key[]) => void) | null>(null)
const onCancel = ref<(() => void) | null>(null)

function openContextmenu(options: ContextmenuOptions) {
  position.x = options.clientX || 0
  position.y = options.clientY || 0
  configs.value = options.configs
  appear.value = options.appear ?? false

  visible.value = true

  return new Promise<Key[] | null>(resolve => {
    onSelect.value = (keys: Key[]) => {
      resolve(keys)
    }
    onCancel.value = () => {
      resolve(null)
    }
  })
}

function afterContextmenu() {
  onSelect.value = null
  onCancel.value = null
}

function handleSelect(keys: Key[]) {
  visible.value = false

  if (isFunction(onSelect.value)) {
    onSelect.value(keys)
    afterContextmenu()
  }
}

function handleCancel() {
  visible.value = false

  if (isFunction(onCancel.value)) {
    onCancel.value()
    afterContextmenu()
  }
}

defineExpose({ visible, position, openContextmenu, handleSelect, handleCancel })
</script>

<template>
  <Dropdown
    v-model:visible="visible"
    :class="[nh.b(), nh.bs('vars')]"
    trigger="click"
    :placement="isRtl ? 'left-start' : 'right-start'"
    :appear="appear"
    :transfer="false"
    :style="{
      top: `${position.y}px`,
      left: `${position.x}px`
    }"
    @contextmenu.prevent.stop
    @select="handleSelect"
    @outside-close="handleCancel"
  >
    <!-- <div :class="nh.be('anchor')"></div> -->
    <template #drop>
      <DropdownList
        :class="[
          nh.be('list'),
          configs.some(c => c.icon) ? nh.bem('list', 'icons') : nh.bem('list', 'no-icon'),
          configs.some(c => c.children && c.children.length)
            ? nh.bem('list', 'arrows')
            : nh.bem('list', 'no-arrow')
        ]"
      >
        <Renderer
          v-for="item in configs"
          :key="item.key"
          :data="{ config: item, nh }"
          :renderer="renderItem"
        ></Renderer>
      </DropdownList>
    </template>
  </Dropdown>
</template>
