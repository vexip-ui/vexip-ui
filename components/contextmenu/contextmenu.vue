<template>
  <Dropdown
    v-model:visible="visible"
    :class="[prefix, `${prefix}-vars`]"
    trigger="click"
    placement="right-start"
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
    <!-- <div :class="`${prefix}__anchor`"></div> -->
    <template #drop>
      <DropdownList
        :class="[
          `${prefix}__list`,
          configs.some(c => c.icon) ? `${prefix}__list--icons` : `${prefix}__list--no-icon`,
          configs.some(c => c.children && c.children.length)
            ? `${prefix}__list--arrows`
            : `${prefix}__list--no-arrow`
        ]"
      >
        <Renderer
          v-for="item in configs"
          :key="item.key"
          :data="item"
          :renderer="renderItem"
        ></Renderer>
      </DropdownList>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { Dropdown } from '@/components/dropdown'
import { DropdownList } from '@/components/dropdown-list'
import { renderItem } from './render'

import { Renderer } from '@/components/renderer'
import { isFunction } from '@vexip-ui/utils'

import type { Key, MenuOptions, MenuConfig } from './symbol'

export default defineComponent({
  name: 'Contextmenu',
  components: {
    Dropdown,
    DropdownList,
    Renderer
  },
  setup() {
    const prefix = 'vxp-contextmenu'
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
      prefix,
      visible,
      configs,
      appear,
      position,

      renderItem,
      openContextmenu,
      handleSelect,
      handleCancel
    }
  }
})
</script>
