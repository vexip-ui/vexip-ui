<template>
  <Dropdown
    v-model:visible="visible"
    :class="prefix"
    trigger="click"
    placement="right-start"
    :appear="appear"
    :transfer="false"
    :style="{
      top: `${position.y}px`,
      left: `${position.x}px`
    }"
    @contextmenu.prevent.stop
    @on-select="handleSelect"
    @on-outside-close="handleCancel"
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

<script lang="tsx">
import { defineComponent, ref, reactive } from 'vue'
import { Dropdown } from '@/components/dropdown'
import { DropdownList } from '@/components/dropdown-list'
import { DropdownItem } from '@/components/dropdown-item'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { isFunction, isObject } from '@/common/utils/common'

import '@/common/icons/chevron-right'

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

    function renderItemIcon(item: MenuConfig) {
      if (!item.icon) return null

      let icon: any

      if (typeof item.icon === 'function') {
        icon = item.icon()
      } else if (isObject(item.icon)) {
        icon = (
          <Icon
            {...item.icon}
            style={[{ color: item.iconColor || item.color }, item.icon.style]}
          ></Icon>
        )
      } else {
        icon = <Icon name={item.icon} style={{ color: item.iconColor || item.color }}></Icon>
      }

      return <div class={`${prefix}__icon`}>{icon}</div>
    }

    function renderItemShortcut(item: MenuConfig) {
      if (!item.shortcut) return null

      return <div class={`${prefix}__shortcut`}>{item.shortcut}</div>
    }

    function renderGroupItem(item: MenuConfig) {
      return (
        <Dropdown
          transfer={false}
          onContextmenu={(event: MouseEvent) => {
            event.preventDefault()
            event.stopPropagation()
          }}
        >
          {{
            default: () => (
              <DropdownItem
                class={`${prefix}__item`}
                label={item.key}
                divided={item.divided}
                disabled={item.disabled}
              >
                {renderItemIcon(item)}
                <span style={{ color: item.color }}>{item.label || item.key}</span>
                {renderItemShortcut(item)}
                <div class={[`${prefix}__icon`, `${prefix}__arrow`]}>
                  <Icon name="chevron-right" style={{ color: item.iconColor || item.color }}></Icon>
                </div>
              </DropdownItem>
            ),
            drop: () => (
              <DropdownList
                class={[
                  `${prefix}__list`,
                  item.children!.some(c => c.icon)
                    ? `${prefix}__list--icons`
                    : `${prefix}__list--no-icon`,
                  item.children!.some(c => c.children?.length)
                    ? `${prefix}__list--arrows`
                    : `${prefix}__list--no-arrow`
                ]}
              >
                {item.children!.map(renderItem)}
              </DropdownList>
            )
          }}
        </Dropdown>
      )
    }

    function renderItem(item: MenuConfig) {
      if (item.children?.length) {
        return renderGroupItem(item)
      } else {
        return (
          <DropdownItem
            class={`${prefix}__item`}
            label={item.key}
            divided={item.divided}
            disabled={item.disabled}
          >
            {renderItemIcon(item)}
            <span style={{ color: item.color }}>{item.label || item.key}</span>
            {renderItemShortcut(item)}
          </DropdownItem>
        )
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
