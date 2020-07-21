<template>
  <div :class="prefix">
    <div :class="`${prefix}__header`">
      <TabNav
        :active="currentActive"
        :card="card"
        @on-change="handleTabPaneChange"
      >
        <TabNavItem
          v-for="(item, index) in items"
          :key="index"
          :label="item.label"
          :icon="item.icon"
          :disabled="item.disabled"
        >
          <template v-if="item.$slots.label">
            <Render
              :renderer="renderLabelSlot"
              :node="item.$slots.label"
            ></Render>
          </template>
          <template v-else>
            {{ item.label }}
          </template>
        </TabNavItem>
      </TabNav>
    </div>
    <div :class="`${prefix}__main`" :style="mainStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Render from '../basis/render'
import TabNav from './tab-nav'
import TabNavItem from './tab-nav-item'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'Tabs',
  components: {
    Render,
    TabNav,
    TabNavItem
  },
  props: {
    card: {
      type: Boolean,
      default: false
    },
    active: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      prefix: `${prefix}-tabs`,
      items: [],
      currentActive: null,
      currentIndex: 0
    }
  },
  computed: {
    mainStyle() {
      return {
        transform: `translateX(-${this.currentIndex}00%) translateZ(0)`
      }
    }
  },
  watch: {
    currentActive(value) {
      this.updateActive()
      this.$emit('on-change', value)
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 触发 nav 的 marker 位置计算
      if (!this.currentActive && this.items.length) {
        this.currentActive = this.items[0].label
      } else {
        this.currentActive = this.active
      }
    })
  },
  methods: {
    handleTabPaneChange(label) {
      this.currentActive = label

      const index = this.items.findIndex(item => item.label === label)

      if (~index) {
        this.currentIndex = index
      }
    },
    updateActive() {
      this.items.forEach(item => {
        item.$emit('on-active-change', this.currentActive)
      })
    },
    renderLabelSlot(h, item) {
      return h('div', item)
    }
  }
}
</script>
