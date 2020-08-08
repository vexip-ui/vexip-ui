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
            [`${prefix}__item--title`]: !item.content,
            [`${prefix}__item--icon`]: item.icon,
            [`${prefix}__item--content`]: !item.title,
            [`${prefix}__item--${item.type}`]: effectiveTypes.includes(
              item.type
            )
          },
          item.className
        ]"
      >
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
          <div
            v-if="item.title"
            :class="`${prefix}__title`"
            v-html="item.title"
          ></div>
          <div :class="`${prefix}__content`" v-html="item.content"></div>
        </template>
        <template v-else>
          <div v-if="item.title" :class="`${prefix}__title`">
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

import 'vue-awesome/icons/times'
import 'vue-awesome/icons/info-circle'
import 'vue-awesome/icons/check-circle'
import 'vue-awesome/icons/exclamation-circle'
import 'vue-awesome/icons/times-circle'

const { prefix } = require('../../style/basis/variable')

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
