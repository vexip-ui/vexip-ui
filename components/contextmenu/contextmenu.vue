<template>
  <Dropdown
    v-model:visible="visible"
    :class="prefix"
    trigger="click"
    placement="right-start"
    :appear="appear"
    :style="{
      top: `${position.y}px`,
      left: `${position.x}px`
    }"
    @on-select="handleSelect"
    @on-outside-close="handleCancel"
  >
    <div :class="`${prefix}__anchor`"></div>
    <template #drop>
      <DropdownList>
        <DropdownItem v-for="item in configs" :key="item.key" :label="item.label || item.key">
          {{ item.label || item.key }}
        </DropdownItem>
      </DropdownList>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { Dropdown } from '@/components/dropdown'
import { DropdownList } from '@/components/dropdown-list'
import { DropdownItem } from '@/components/dropdown-item'
import { isFunction } from '@/common/utils/common'

import type { Key, MenuOptions, MenuConfig } from './symbol'

export default defineComponent({
  name: 'Contextmenu',
  components: {
    Dropdown,
    DropdownList,
    DropdownItem
  },
  setup() {
    const visible = ref(false)
    const configs = ref<MenuConfig[]>([])
    const appear = ref(false)

    const position = reactive({
      x: 0,
      y: 0
    })

    const onSelect = ref<((key: Key) => void) | null>(null)
    const onCancel = ref<(() => void) | null>(null)

    function openContextmenu(options: MenuOptions) {
      position.x = options.clientX
      position.y = options.clientY
      configs.value = options.configs
      appear.value = options.appear ?? false

      visible.value = true

      return new Promise<Key | null>(resolve => {
        onSelect.value = (key: Key) => {
          resolve(key)
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

    function handleSelect(key: Key) {
      visible.value = false

      if (isFunction(onSelect.value)) {
        onSelect.value(key)
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

    return {
      prefix: 'vxp-contextmenu',
      visible,
      configs,
      appear,
      position,

      openContextmenu,
      handleSelect,
      handleCancel
    }
  }
})
</script>
