<template>
  <!-- eslint-disable vue/no-v-html -->
  <Popup
    ref="popup"
    :class="nh.b()"
    :transition-name="`vxp-popup-${placement.split('-')[1]}`"
    :placement="placement"
  >
    <template #item="{ item }">
      <div
        :class="[
          {
            [nh.be('item')]: true,
            [nh.bs('vars')]: true,
            [nh.bem('item', 'title-only')]: !item.content && typeof item.renderer !== 'function',
            [nh.bem('item', 'has-icon')]: item.icon,
            [nh.bem('item', 'content-only')]: !item.title,
            [nh.bem('item', item.type)]: item.type && effectiveTypes.includes(item.type),
            [nh.bem('item', 'background')]: item.background,
            [nh.bem('item', 'color')]: item.background && item.color,
            [nh.bem('item', 'color-only')]: !item.background && item.color,
            [nh.bem('item', 'marker')]: item.marker
          },
          item.className
        ]"
        role="alert"
        :style="[
          {
            color: typeof item.color === 'string' ? item.color : null,
            backgroundColor: typeof item.background === 'string' ? item.background : null
          },
          item.style
        ]"
        aria-atomic="true"
        :aria-live="item.type && assertiveTypes.includes(item.type) ? 'assertive' : 'polite'"
      >
        <div v-if="item.icon" :class="nh.be('icon')" :style="{ color: item.iconColor }">
          <Renderer
            v-if="typeof item.icon === 'function'"
            :renderer="item.icon"
            :data="item"
          ></Renderer>
          <Icon
            v-else-if="item.icon"
            :icon="item.icon"
            :scale="!item.content && typeof item.renderer !== 'function' ? 1 : 2"
            :style="[{ color: item.iconColor }, item.icon.style]"
          ></Icon>
        </div>
        <div :class="nh.be('wrapper')">
          <Renderer
            v-if="typeof item.renderer === 'function'"
            :renderer="item.renderer"
            :data="item"
          ></Renderer>
          <template v-else>
            <div
              v-if="item.title"
              :class="nh.be('title')"
              :style="{
                color:
                  typeof item.titleColor === 'string'
                    ? item.titleColor
                    : typeof item.color === 'string'
                      ? item.color
                      : undefined
              }"
            >
              {{ item.title || '' }}
            </div>
            <div :class="nh.be('content')">
              {{ item.content || '' }}
            </div>
          </template>
        </div>
        <button v-if="item.closable" :class="nh.be('close')" @click="remove(item.key)">
          <Icon label="close">
            <Xmark></Xmark>
          </Icon>
        </button>
      </div>
    </template>
  </Popup>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { Popup } from '@/components/popup'
import { Xmark } from '@vexip-ui/icons'
import { useNameHelper } from '@vexip-ui/config'

import type { Key, NoticePlacement } from './symbol'

export default defineComponent({
  name: 'Notice',
  components: {
    Icon,
    Renderer,
    Popup,
    Xmark
  },
  setup() {
    const placement = ref<NoticePlacement>('top-right')
    const popup = ref<InstanceType<typeof Popup>>()

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
      nh: useNameHelper('notice'),
      effectiveTypes: ['info', 'success', 'warning', 'error'],
      assertiveTypes: ['success', 'warning', 'error'],
      placement,

      popup,

      add,
      remove,
      clear
    }
  }
})
</script>
