<template>
  <!-- eslint-disable vue/no-v-html -->
  <Popup
    ref="popup"
    :class="nh.b()"
    :transition-name="nh.ns(`popup-${placement}`)"
    :placement="placementCenter"
  >
    <template #item="{ item }: { item: import('./symbol').MessageOptions }">
      <div
        :class="[
          {
            [nh.be('item')]: true,
            [nh.bs('vars')]: true,
            [nh.bem('item', item.type!)]: item.type && effectiveTypes.includes(item.type),
            [nh.bem('item', 'background')]: item.background,
            [nh.bem('item', 'color')]: item.background && item.color,
            [nh.bem('item', 'color-only')]: !item.background && item.color,
            [nh.bem('item', 'has-icon')]: item.icon,
            [nh.bem('item', 'closable')]: item.closable
          },
          item.className
        ]"
        role="alert"
        :style="[
          {
            color: typeof item.color === 'string' ? item.color : undefined,
            backgroundColor: typeof item.background === 'string' ? item.background : undefined
          },
          item.style || {}
        ]"
        aria-atomic="true"
        :aria-live="item.type && assertiveTypes.includes(item.type) ? 'assertive' : 'polite'"
      >
        <div :class="nh.be('wrapper')">
          <div
            v-if="item.icon || (item.type && effectiveTypes.includes(item.type))"
            :class="nh.be('icon')"
            :style="{ color: item.iconColor }"
          >
            <Renderer
              v-if="typeof item.icon === 'function'"
              :renderer="item.icon"
              :data="item"
            ></Renderer>
            <Icon
              v-else-if="item.icon"
              :icon="item.icon"
              :style="[{ color: item.iconColor }, item.icon.style]"
            ></Icon>
            <Icon
              v-else
              v-bind="predefinedIcons[item.type!]"
              :style="{ color: item.iconColor }"
            ></Icon>
          </div>
          <Renderer
            v-if="typeof item.renderer === 'function'"
            :renderer="item.renderer"
            :data="item"
          ></Renderer>
          <template v-else>
            <div v-if="item.parseHtml" :class="nh.be('content')" v-html="item.content"></div>
            <div v-else :class="nh.be('content')">
              {{ item.content || '' }}
            </div>
          </template>
        </div>
        <button
          v-if="item.closable"
          type="button"
          :class="nh.be('close')"
          @click="remove(item.key!)"
        >
          <Icon v-bind="icons.close" label="close"></Icon>
        </button>
      </div>
    </template>
  </Popup>
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { Popup } from '@/components/popup'

import { computed, defineComponent, ref } from 'vue'

import { useIcons, useNameHelper } from '@vexip-ui/config'

import type { Key, MessagePlacement } from './symbol'

const effectiveTypes = Object.freeze(['info', 'success', 'warning', 'error'])
const assertiveTypes = Object.freeze(['success', 'warning', 'error'])

export default defineComponent({
  name: 'Message',
  components: {
    Icon,
    Renderer,
    Popup
  },
  setup() {
    const icons = useIcons()

    const predefinedIcons = computed(() => ({
      info: icons.value.info,
      success: icons.value.success,
      warning: icons.value.warning,
      error: icons.value.error
    }))

    const placement = ref<MessagePlacement>('top')
    const popup = ref<InstanceType<typeof Popup>>()

    async function add(options: Record<string, any>) {
      return popup.value ? await popup.value.add(options) : null
    }

    async function remove(key: Key) {
      return !!popup.value && (await popup.value.remove(key))
    }

    function clear() {
      popup.value && popup.value.clear()
    }

    return {
      nh: useNameHelper('message'),
      icons,

      effectiveTypes,
      assertiveTypes,

      placement,

      predefinedIcons,
      placementCenter: computed(() => `${placement.value}-center` as const),

      popup,

      add,
      remove,
      clear
    }
  }
})
</script>
