<template>
  <!-- eslint-disable vue/no-v-html -->
  <Popup
    ref="popup"
    :class="prefix"
    :transition-name="transitionName"
    :placement="`${placement}-center`"
  >
    <template #default="{ item }">
      <div
        :class="[
          {
            [`${prefix}__item`]: true,
            [`${prefix}__item--background`]: item.background,
            [`${prefix}__item--${item.type}`]: effectiveTypes.includes(
              item.type
            ),
            [`${prefix}__item--color-only`]: !item.background && item.color,
            [`${prefix}__item--has-icon`]: item.icon,
            [`${prefix}__item--closable`]: item.closable
          },
          item.className
        ]"
      >
        <div :class="`${prefix}__wrapper`">
          <div
            v-if="item.icon"
            :class="`${prefix}__icon`"
            :style="{ color: item.iconColor }"
          >
            <Icon :name="item.icon"></Icon>
          </div>
          <Render
            v-if="typeof item.renderer === 'function'"
            :renderer="item.renderer"
          ></Render>
          <template v-else-if="item.parseHtml">
            <div :class="`${prefix}__content`" v-html="item.content"></div>
          </template>
          <template v-else>
            <div :class="`${prefix}__content`">
              {{ item.content }}
            </div>
          </template>
        </div>
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

import 'vue-awesome/icons/times'
import 'vue-awesome/icons/info-circle'
import 'vue-awesome/icons/check-circle'
import 'vue-awesome/icons/exclamation-circle'
import 'vue-awesome/icons/times-circle'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'Message',
  components: {
    Icon,
    Render,
    Popup
  },
  data() {
    return {
      prefix: `${prefix}-message`,
      placement: 'top',
      effectiveTypes: ['info', 'success', 'warning', 'error']
    }
  },
  computed: {
    popup() {
      return this.$refs.popup
    },
    transitionName() {
      return `${prefix}-popup-${this.placement}`
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
