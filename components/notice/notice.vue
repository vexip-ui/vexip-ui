<script setup lang="ts">
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { Popup } from '@/components/popup'

import { computed, reactive, ref } from 'vue'

import { useIcons, useNameHelper } from '@vexip-ui/config'
import { assertiveTypes, effectiveTypes } from './symbol'

import type { Key, NoticeConfig, NoticePlacement } from './symbol'

defineOptions({ name: 'Notice' })

const nh = useNameHelper('notice')
const icons = useIcons()

const predefinedIcons = computed(() => ({
  primary: icons.value.info,
  info: icons.value.info,
  success: icons.value.success,
  warning: icons.value.warning,
  error: icons.value.error,
}))

const placement = ref<NoticePlacement>('top-right')
const startOffset = ref(30)
const itemGap = ref(16)
const popup = ref<InstanceType<typeof Popup>>()

async function add(options: Record<string, any>) {
  if (popup.value) {
    await popup.value.add(options)
  }
}

async function remove(key: Key) {
  return !!popup.value && (await popup.value.remove(key))
}

function clear() {
  popup.value && popup.value.clear()
}

function config(config: NoticeConfig) {
  placement.value = config.placement || placement.value
  startOffset.value = config.startOffset || startOffset.value
  itemGap.value = config.itemGap || itemGap.value
}

defineExpose(
  reactive({
    popup,
    add,
    remove,
    clear,
    config,
  }),
)
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <Popup
    ref="popup"
    :class="nh.b()"
    :transition-name="nh.ns(`popup-${placement.split('-')[1]}`)"
    :placement="placement"
    :start-offset="startOffset"
    :item-gap="itemGap"
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
          <Icon
            v-if="item.icon"
            :icon="item.icon"
            :scale="!item.content && typeof item.renderer !== 'function' ? 1 : 2"
            :style="[{ color: item.iconColor }, (item.icon as any).style]"
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
