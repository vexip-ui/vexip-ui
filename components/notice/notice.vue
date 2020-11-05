<template>
  <!-- eslint-disable vue/no-v-html -->
  <Popup
    ref="popup"
    :class="prefix"
    :transition-name="transitionName"
    :placement="placement"
  >
    <template #item="{ item }">
      <div
        :class="[
          {
            [`${prefix}__item`]: true,
            [`${prefix}__item--title-only`]: !item.content && !item.renderer,
            [`${prefix}__item--has-icon`]: item.icon,
            [`${prefix}__item--content-only`]: !item.title,
            [`${prefix}__item--${item.type}`]: effectiveTypes.includes(
              item.type
            ),
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
        <div
          v-if="item.icon"
          :class="`${prefix}__icon`"
          :style="{ color: item.iconColor }"
        >
          <Render
            v-if="typeof item.icon === 'function'"
            :renderer="item.icon"
            :data="item"
          ></Render>
          <Icon
            v-else-if="item.icon && typeof item.icon === 'object'"
            v-bind="item.icon"
            :style="[{ color: item.iconColor }, item.icon.style]"
          ></Icon>
          <Icon
            v-else
            :name="item.icon"
            :style="{ color: item.iconColor }"
          ></Icon>
        </div>
        <Render
          v-if="typeof item.renderer === 'function'"
          :renderer="item.renderer"
          :data="item"
        ></Render>
        <template v-else-if="item.parseHtml">
          <div
            v-if="item.title"
            :class="`${prefix}__title`"
            :style="{
              color: typeof item.titleColor === 'string' ? item.titleColor : (typeof item.color === 'string' ? item.color : null),
            }"
            v-html="item.title"
          ></div>
          <div :class="`${prefix}__content`" v-html="item.content"></div>
        </template>
        <template v-else>
          <div
            v-if="item.title"
            :class="`${prefix}__title`"
            :style="{
              color: typeof item.titleColor === 'string' ? item.titleColor : (typeof item.color === 'string' ? item.color : null),
            }"
          >
            {{ item.title }}
          </div>
          <div :class="`${prefix}__content`">
            {{ item.content }}
          </div>
        </template>
        <div
          v-if="item.closable"
          :class="`${prefix}__close`"
          @click="clear(item.key)"
        >
          <Icon name="times"></Icon>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Icon from '../icon'
import Render from '../basis/render'
import Popup from '../popup'

import '../../icons/times'
import '../../icons/info-circle'
import '../../icons/check-circle'
import '../../icons/exclamation-circle'
import '../../icons/times-circle'

const { prefix } = require('../../src/style/basis/variable')

export default {
  name: 'Notice',
  components: {
    Icon,
    Render,
    Popup
  },
  data() {
    return {
      prefix: `${prefix}-notice`,
      placement: 'top-right',
      effectiveTypes: ['info', 'success', 'warning', 'error']
    }
  },
  computed: {
    popup() {
      return this.$refs.popup
    },
    transitionName() {
      return `${prefix}-popup-${this.placement.split('-')[1]}`
    }
  },
  methods: {
    add(options) {
      return this.popup && this.popup.add(options)
    },
    clear(key) {
      return this.popup && this.popup.clear(key)
    },
    clearAll() {
      return this.popup && this.popup.clearAll()
    }
  }
}
</script>
