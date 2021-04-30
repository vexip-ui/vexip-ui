<template>
  <li
    v-if="visible"
    :class="className"
    :draggable="draggable"
    @click.left="handleClick"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragend.stop="handleDragEnd"
    @drop.stop="handleDrop"
  >
    <slot
      v-bind="{
        ...node,
        toggleCheck: handleToggleCheck,
        toggleExpand: handleToggleExpand,
        toggleSelect: handleToggleSelect
      }"
    >
      <div :class="`${prefix}__content`">
        <span
          ref="arrow"
          :class="{
            [`${prefix}__arrow`]: true,
            [`${prefix}__arrow--transparent`]: !loading && !hasArrow,
            [`${prefix}__arrow--expanded`]: expanded
          }"
          @click="handleToggleExpand()"
        >
          <Icon
            v-if="loading"
            spin
            name="spinner"
            :scale="0.8"
          ></Icon>
          <Icon
            v-else
            name="chevron-right"
            :scale="0.8"
          ></Icon>
        </span>
        <Checkbox
          v-if="hasCheckbox"
          ref="checkbox"
          :class="`${prefix}__checkbox`"
          :control="!!hasArrow"
          :checked="checked"
          :disabled="isDisabled"
          :partial="partial"
          @click.native.stop
          @click.native.prevent="handleToggleCheck()"
        ></Checkbox>
        <span
          :class="{
            [`${prefix}__label`]: true,
            [`${prefix}__label--selected`]: selected,
            [`${prefix}__label--disabled`]: isDisabled,
            [`${prefix}__label--readonly`]: isReadonly,
            [`${prefix}__label--is-floor`]: floorSelect && children && children.length
          }"
          @click="handleToggleSelect()"
        >
          <Render
            v-if="usedRenderer"
            :renderer="usedRenderer"
            :data="node.data"
            :node="node"
          ></Render>
          <template v-else>
            <slot name="label" v-bind="data">
              {{ data[labelKey] }}
            </slot>
          </template>
        </span>
      </div>
    </slot>
    <CollapseTransition :appear="appear">
      <ul
        v-if="showChildren"
        :class="`${prefix}__list`"
        :style="listStyle"
      >
        <TreeNode
          v-for="(item, index) in children"
          v-show="item.visible"
          :key="index"
          v-bind="item"
          :node="item"
          :label-key="labelKey"
          :children-key="childrenKey"
          :children="item[childrenKey]"
          :draggable="draggable"
          :appear="appear"
          :floor-select="floorSelect"
        >
          <template #default="childNode">
            <slot v-bind="childNode"></slot>
          </template>
          <template #label="childData">
            <slot name="label" v-bind="childData"></slot>
          </template>
        </TreeNode>
      </ul>
    </CollapseTransition>
  </li>
</template>

<script>
import Checkbox from '../checkbox'
import CollapseTransition from '../collapse/collapse-transition'
import Icon from '../icon'
import Render from '../basis/render'
import { isNull, findComponentUpward } from '../../src/utils/common'
import { config } from '../../src/config/properties'

const prefix = config.defaults.prefixCls

const parentName = 'Tree'

export default {
  name: 'TreeNode',
  components: {
    Checkbox,
    CollapseTransition,
    Icon,
    Render
  },
  inheritAttrs: false,
  props: {
    node: {
      type: Object,
      default() {
        return {}
      }
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    appear: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: false
    },
    expanded: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    checked: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    partial: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    indent: {
      type: [String, Number],
      default: '1.2em'
    },
    children: {
      type: Array,
      default() {
        return []
      }
    },
    draggable: {
      type: Boolean,
      default: false
    },
    floorSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: `${prefix}-tree`,
      treeInstance: null,
      loaded: false
    }
  },
  computed: {
    className() {
      const { prefix, selected, expanded, isDisabled, isReadonly } = this

      return {
        [`${prefix}__node`]: true,
        [`${prefix}__node--selected`]: selected,
        [`${prefix}__node--expanded`]: expanded,
        [`${prefix}__node--disabled`]: isDisabled,
        [`${prefix}__node--readonly`]: isReadonly
      }
    },
    showChildren() {
      const { expanded, children } = this

      return expanded && children && children.length
    },
    isDisabled() {
      return this.$parent.isDisabled || this.disabled
    },
    isReadonly() {
      return this.$parent.isReadonly || this.readonly
    },
    hasArrow() {
      const arrow = this.data.arrow
      const { treeInstance, children } = this

      let arrowSign = 'auto'
      let asyncLoad = false

      if (isNull(arrow)) {
        if (treeInstance) {
          arrowSign = treeInstance.arrow
          asyncLoad = treeInstance.bindAsyncLoad
        }
      } else {
        arrowSign = arrow
      }

      return arrowSign === 'auto'
        ? (children && children.length) || asyncLoad
        : !!arrowSign
    },
    hasCheckbox() {
      const checkbox = this.data.checkbox
      const { treeInstance } = this

      return isNull(checkbox) ? treeInstance && treeInstance.checkbox : checkbox
    },
    usedRenderer() {
      const renderer = this.data.renderer
      const { treeInstance } = this

      return typeof renderer === 'function'
        ? treeInstance && treeInstance.renderer
        : renderer
    },
    listStyle() {
      let indent = this.indent

      if (typeof indent === 'number') {
        indent = `${indent}px`
      }

      return {
        paddingLeft: indent
      }
    }
  },
  mounted() {
    const treeInstance = findComponentUpward(this, parentName)

    if (treeInstance) {
      this.treeInstance = treeInstance
    }
  },
  methods: {
    setValue(key, value) {
      this.$set(this.node, key, value)
    },
    handleClick() {
      this.callTreeInstanceMethod('handleNodeClick', this.node)
    },
    handleToggleCheck(able = !this.checked) {
      if (this.isDisabled) return

      this.setValue('checked', able)
      this.setValue('partial', false)

      this.$nextTick(() => {
        this.callTreeInstanceMethod('computeCheckedState', this.node, able)
      })
    },
    async handleToggleExpand(able = !this.expanded) {
      if (this.loading || this.isDisabled) return

      const {
        node,
        treeInstance,
        callTreeInstanceMethod,
        asyncLoadCallback,
        loaded
      } = this

      if (able && treeInstance && treeInstance.bindAsyncLoad && !loaded) {
        this.setValue('loading', true)

        const result = await callTreeInstanceMethod('handleAsyncLoad', node)

        asyncLoadCallback(result)
      } else {
        this.setValue('expanded', able)

        if (able) {
          callTreeInstanceMethod('handleNodeExpand', node)
        } else {
          callTreeInstanceMethod('handleNodeReduce', node)
        }
      }
    },
    handleToggleSelect(able = !this.selected) {
      if (this.isDisabled) return

      if (this.floorSelect && this.children && this.children.length) {
        return this.handleToggleExpand()
      }

      this.setValue('selected', !this.isReadonly && able)

      if (this.isReadonly || able) {
        this.callTreeInstanceMethod('handleNodeSelect', this.node)
      } else {
        this.callTreeInstanceMethod('handleNodeCancel', this.node)
      }
    },
    asyncLoadCallback(success = true) {
      this.setValue('loading', false)
      this.setValue('expanded', success !== false)

      if (success) {
        this.loaded = true
        this.callTreeInstanceMethod('handleNodeExpand', this.node)
      }
    },
    callTreeInstanceMethod(name, ...params) {
      if (this.treeInstance && typeof this.treeInstance[name] === 'function') {
        return this.treeInstance[name](...params)
      }

      return null
    },
    handleDragStart() {
      if (!this.draggable) return

      this.callTreeInstanceMethod('handleNodeDragStart', this)
    },
    handleDragOver(event) {
      if (!this.draggable) return

      event.preventDefault()

      this.callTreeInstanceMethod('handleNodeDragOver', this, event)
    },
    handleDrop(event) {
      if (!this.draggable) return

      event.preventDefault()

      this.callTreeInstanceMethod('handleNodeDrop', this)
    },
    handleDragEnd() {
      if (!this.draggable) return

      this.callTreeInstanceMethod('handleNodeDragEnd', this)
    }
  }
}
</script>
