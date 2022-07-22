<template>
  <!-- eslint-disable vue/no-v-html -->
  <Popup
    ref="popup"
    :class="nh.b()"
    :transition-name="`vxp-popup-${placement}`"
    :placement="placementCenter"
  >
    <template #item="{ item }">
      <div
        :class="[
          {
            [nh.be('item')]: true,
            [nh.bs('vars')]: true,
            [nh.bem('item', item.type)]: item.type && effectiveTypes.includes(item.type),
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
          item.style
        ]"
        aria-atomic="true"
        :aria-live="item.type && assertiveTypes.includes(item.type) ? 'assertive' : 'polite'"
      >
        <div :class="nh.be('wrapper')">
          <div v-if="item.icon" :class="nh.be('icon')" :style="{ color: item.iconColor }">
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
          </div>
          <Renderer
            v-if="typeof item.renderer === 'function'"
            :renderer="item.renderer"
            :data="item"
          ></Renderer>
          <template v-else>
            <div :class="nh.be('content')">
              {{ item.content || '' }}
            </div>
          </template>
        </div>
        <div v-if="item.closable" :class="nh.be('close')" @click="remove(item.key)">
          <Icon><Xmark></Xmark></Icon>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { Popup } from '@/components/popup'
import { Xmark } from '@vexip-ui/icons'
import { useNameHelper } from '@vexip-ui/config'

import type { Key, MessagePlacement } from './symbol'

export default defineComponent({
  name: 'Message',
  components: {
    Icon,
    Renderer,
    Popup,
    Xmark
  },
  setup() {
    const placement = ref<MessagePlacement>('top')
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
      nh: useNameHelper('message'),
      effectiveTypes: ['info', 'success', 'warning', 'error'],
      assertiveTypes: ['success', 'warning', 'error'],
      placement,

      placementCenter: computed(() => {
        return `${placement.value}-center` as const
      }),

      popup,

      add,
      remove,
      clear
    }
  }
})
</script>
