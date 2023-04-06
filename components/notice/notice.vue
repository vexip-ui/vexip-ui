<template>
  <!-- eslint-disable vue/no-v-html -->
  <Popup
    ref="popup"
    :class="nh.b()"
    :transition-name="nh.ns(`popup-${placement.split('-')[1]}`)"
    :placement="placement"
  >
    <template #item="{ item }: { item: import('./symbol').NoticeOptions }">
      <div
        :class="[
          {
            [nh.be('item')]: true,
            [nh.bs('vars')]: true,
            [nh.bem('item', 'title-only')]: !item.content && typeof item.renderer !== 'function',
            [nh.bem('item', 'has-icon')]: item.icon,
            [nh.bem('item', 'content-only')]: !item.title,
            [nh.bem('item', item.type!)]: item.type && effectiveTypes.includes(item.type),
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
            color: typeof item.color === 'string' ? item.color : undefined,
            backgroundColor: typeof item.background === 'string' ? item.background : undefined
          },
          item.style || {}
        ]"
        aria-atomic="true"
        :aria-live="item.type && assertiveTypes.includes(item.type) ? 'assertive' : 'polite'"
      >
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
            :scale="!item.content && typeof item.renderer !== 'function' ? 1 : 2"
            :style="[{ color: item.iconColor }, item.icon.style]"
          ></Icon>
          <Icon
            v-else
            v-bind="predefinedIcons[item.type!]"
            :scale="!item.content && typeof item.renderer !== 'function' ? 1 : 2"
            :style="{ color: item.iconColor }"
          ></Icon>
        </div>
        <div :class="nh.be('wrapper')">
          <Renderer
            v-if="typeof item.renderer === 'function'"
            :renderer="item.renderer"
            :data="item"
          ></Renderer>
          <template v-else>
            <template v-if="item.title">
              <div
                v-if="item.parseHtml"
                :class="nh.be('title')"
                :style="{
                  color: typeof item.titleColor === 'string' ? item.titleColor : undefined
                }"
                v-html="item.title"
              ></div>
              <div
                v-else
                :class="nh.be('title')"
                :style="{
                  color: typeof item.titleColor === 'string' ? item.titleColor : undefined
                }"
              >
                {{ item.title || '' }}
              </div>
            </template>
            <template v-if="item.content">
              <div v-if="item.parseHtml" :class="nh.be('content')" v-html="item.content"></div>
              <div v-else :class="nh.be('content')">
                {{ item.content || '' }}
              </div>
            </template>
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
import { defineComponent, ref, computed } from 'vue'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { Popup } from '@/components/popup'
import { useNameHelper, useIcons } from '@vexip-ui/config'

import type { Key, NoticePlacement } from './symbol'

const effectiveTypes = Object.freeze(['info', 'success', 'warning', 'error'])
const assertiveTypes = Object.freeze(['success', 'warning', 'error'])

export default defineComponent({
  name: 'Notice',
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

    const placement = ref<NoticePlacement>('top-right')
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
      nh: useNameHelper('notice'),
      icons,

      effectiveTypes,
      assertiveTypes,

      placement,
      predefinedIcons,

      popup,

      add,
      remove,
      clear
    }
  }
})
</script>
