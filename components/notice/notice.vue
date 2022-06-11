<template>
  <!-- eslint-disable vue/no-v-html -->
  <Popup
    ref="popup"
    :class="prefix"
    :transition-name="`vxp-popup-${placement.split('-')[1]}`"
    :placement="placement"
  >
    <template #item="{ item }">
      <div
        :class="[
          {
            [`${prefix}__item`]: true,
            [`${prefix}-vars`]: true,
            [`${prefix}__item--title-only`]: !item.content && typeof item.renderer !== 'function',
            [`${prefix}__item--has-icon`]: item.icon,
            [`${prefix}__item--content-only`]: !item.title,
            [`${prefix}__item--${item.type}`]: item.type && effectiveTypes.includes(item.type),
            [`${prefix}__item--background`]: item.background,
            [`${prefix}__item--color`]: item.background && item.color,
            [`${prefix}__item--color-only`]: !item.background && item.color,
            [`${prefix}__item--marker`]: item.marker
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
        <div v-if="item.icon" :class="`${prefix}__icon`" :style="{ color: item.iconColor }">
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
        <div :class="`${prefix}__wrapper`">
          <Renderer
            v-if="typeof item.renderer === 'function'"
            :renderer="item.renderer"
            :data="item"
          ></Renderer>
          <template v-else>
            <div
              v-if="item.title"
              :class="`${prefix}__title`"
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
            <div :class="`${prefix}__content`">
              {{ item.content || '' }}
            </div>
          </template>
        </div>
        <div v-if="item.closable" :class="`${prefix}__close`" @click="remove(item.key)">
          <Icon><Xmark></Xmark></Icon>
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
import { Xmark } from '@vexip-ui/icons'

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
      prefix: 'vxp-notice',
      effectiveTypes: ['info', 'success', 'warning', 'error'],
      placement,

      popup,

      add,
      remove,
      clear
    }
  }
})
</script>
