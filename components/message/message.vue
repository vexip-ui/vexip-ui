<template>
  <!-- eslint-disable vue/no-v-html -->
  <Popup
    ref="popup"
    :class="prefix"
    :transition-name="`vxp-popup-${placement}`"
    :placement="`${placement}-center`"
  >
    <template #item="{ item }">
      <div
        :class="[
          {
            [`${prefix}__item`]: true,
            [`${prefix}__item--${item.type}`]: effectiveTypes.includes(item.type),
            [`${prefix}__item--background`]: item.background,
            [`${prefix}__item--color`]: item.background && item.color,
            [`${prefix}__item--color-only`]: !item.background && item.color,
            [`${prefix}__item--has-icon`]: item.icon,
            [`${prefix}__item--closable`]: item.closable
          },
          item.className
        ]"
        :style="[
          {
            color: typeof item.color === 'string' ? item.color : null,
            backgroundColor: typeof item.background === 'string' ? item.background : null
          },
          item.style
        ]"
      >
        <div :class="`${prefix}__wrapper`">
          <div v-if="item.icon" :class="`${prefix}__icon`" :style="{ color: item.iconColor }">
            <Renderer
              v-if="typeof item.icon === 'function'"
              :renderer="item.icon"
              :data="item"
            ></Renderer>
            <Icon
              v-else-if="item.icon && typeof item.icon === 'object'"
              v-bind="item.icon"
              :style="[{ color: item.iconColor }, item.icon.style]"
            ></Icon>
            <Icon v-else :name="item.icon" :style="{ color: item.iconColor }"></Icon>
          </div>
          <Renderer
            v-if="typeof item.renderer === 'function'"
            :renderer="item.renderer"
            :data="item"
          ></Renderer>
          <template v-else>
            <div :class="`${prefix}__content`">
              {{ item.content }}
            </div>
          </template>
        </div>
        <div v-if="item.closable" :class="`${prefix}__close`" @click="remove(item.key)">
          <Icon name="times"></Icon>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { Popup } from '@/components/popup'

import '@/common/icons/times'

import type { Key, MessagePlacement } from './symbol'

const props = {
  placement: {
    default: 'top' as MessagePlacement,
    validator: (value: MessagePlacement) => ['top', 'bottom'].includes(value)
  }
}

export default defineComponent({
  name: 'Message',
  components: {
    Icon,
    Renderer,
    Popup
  },
  props,
  setup() {
    const popup = ref<InstanceType<typeof Popup> | null>(null)

    async function add(options: Record<string, unknown>) {
      return popup.value ? await popup.value.add(options) : null
    }

    async function remove(key: Key) {
      return !!popup.value && (await popup.value.remove(key))
    }

    function clear() {
      popup.value && popup.value.clear()
    }

    return {
      prefix: 'vxp-message',
      effectiveTypes: ['info', 'success', 'warning', 'error'],

      popup,

      add,
      remove,
      clear
    }
  }
})
</script>
