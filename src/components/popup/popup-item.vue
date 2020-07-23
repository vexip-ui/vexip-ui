<template>
  <transition
    appear
    type="animation"
    :name="transitionName"
  >
    <div
      :class="`${prefix}__item`"
      :style="{zIndex: item.zIndex}"
      :vxp-index="item.key"
    >
      <div :class="[`${prefix}__item-inner`, innerClass]">
        <slot name="item" :item="item">
          <Render
            v-if="typeof item.renderer === 'function'"
            :renderer="item.renderer"
          ></Render>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <template v-else-if="item.parseHtml" v-html="item.content"></template>
          <template v-else>
            {{ item.content }}
          </template>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
import Render from '../basis/render'
// import { findComponentUpward } from '../../utils/common'

const { prefix } = require('../../style/basis/variable')

// const parentName = 'Popup'

export default {
  name: 'PopupItem',
  components: {
    Render
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    transitionName: {
      type: String,
      default: `${prefix}-popup-top`
    },
    innerClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  data() {
    return {
      prefix: `${prefix}-popup`
    }
  }
}
</script>
