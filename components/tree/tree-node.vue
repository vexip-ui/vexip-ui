<template>
  <li
    v-if="visible"
    ref="wrapper"
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
          ref="arrowEl"
          :class="{
            [`${prefix}__arrow`]: true,
            [`${prefix}__arrow--transparent`]: !loading && !hasArrow,
            [`${prefix}__arrow--expanded`]: expanded
          }"
          @click="handleToggleExpand()"
        >
          <Icon v-if="loading" spin name="spinner"></Icon>
          <Icon v-else name="chevron-right"></Icon>
        </span>
        <Checkbox
          v-if="hasCheckbox"
          :class="`${prefix}__checkbox`"
          :control="!!hasArrow"
          :checked="checked"
          :disabled="isDisabled"
          :partial="partial"
          @click.prevent.stop="handleToggleCheck()"
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
          <Renderer
            v-if="renderer"
            :renderer="renderer"
            :data="{ data: node.data, node }"
          ></Renderer>
          <template v-else>
            <slot name="label" v-bind="data">
              {{ data[labelKey] }}
            </slot>
          </template>
        </span>
      </div>
    </slot>
    <CollapseTransition :appear="appear">
      <ul v-if="showChildren" :class="`${prefix}__list`" :style="listStyle">
        <TreeNode
          v-for="(item, index) in children"
          v-show="item.visible"
          :key="index"
          v-bind="(item as any)"
          :node="item"
          :label-key="labelKey"
          :children-key="childrenKey"
          :children="getNodeChildren(item)"
          :indent="indent"
          :draggable="draggable"
          :appear="appear"
          :floor-select="floorSelect"
        >
          <template #default="childNode">
            <slot v-bind="(childNode as any)"></slot>
          </template>
          <template #label="childData">
            <slot name="label" v-bind="(childData as any)"></slot>
          </template>
        </TreeNode>
      </ul>
    </CollapseTransition>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, provide, inject, nextTick } from 'vue'
import { Checkbox } from '@/components/checkbox'
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { isNull } from '@/common/utils/common'
import { TREE_STATE, TREE_NODE_STATE } from './symbol'

import type { PropType } from 'vue'
import type { TreeNodeOptions } from './symbol'

const props = {
  node: {
    type: Object as PropType<TreeNodeOptions>,
    default: () => ({})
  },
  data: {
    type: Object,
    default: () => ({})
  },
  arrow: {
    type: [Boolean, String] as PropType<boolean | 'auto'>,
    default: 'auto',
    validator: (value: boolean | 'auto') => {
      return typeof value === 'boolean' || value === 'auto'
    }
  },
  checkbox: {
    type: Boolean,
    default: null
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
    type: Array as PropType<TreeNodeOptions[]>,
    default: () => []
  },
  draggable: {
    type: Boolean,
    default: false
  },
  floorSelect: {
    type: Boolean,
    default: false
  }
}

export default defineComponent({
  name: 'TreeNode',
  components: {
    Checkbox,
    CollapseTransition,
    Icon,
    Renderer
  },
  inheritAttrs: false,
  props,
  setup(props) {
    const treeState = inject(TREE_STATE)!
    const parentState = inject(TREE_NODE_STATE)!

    const prefix = 'vxp-tree'

    const nodeElement = ref<HTMLElement | null>(null)
    const arrowElement = ref<HTMLElement | null>(null)

    let loaded = false

    const isDisabled = computed(() => {
      return parentState.disabled || props.disabled
    })
    const isReadonly = computed(() => {
      return parentState.readonly || props.readonly
    })
    const className = computed(() => {
      return {
        [`${prefix}__node`]: true,
        [`${prefix}__node--selected`]: props.selected,
        [`${prefix}__node--expanded`]: props.expanded,
        [`${prefix}__node--disabled`]: isDisabled.value,
        [`${prefix}__node--readonly`]: isReadonly.value
      }
    })
    const showChildren = computed(() => {
      return props.expanded && props.children?.length > 0
    })
    const hasArrow = computed(() => {
      const arrow = props.arrow

      let arrowSign: boolean | 'auto' = 'auto'
      let asyncLoad = false

      if (isNull(arrow)) {
        if (treeState) {
          arrowSign = treeState.arrow
          asyncLoad = treeState.boundAsyncLoad
        }
      } else {
        arrowSign = arrow
      }

      return arrowSign === 'auto' ? props.children?.length || asyncLoad : !!arrowSign
    })
    const hasCheckbox = computed(() => {
      const checkbox = props.checkbox

      return isNull(checkbox) ? treeState.checkbox : checkbox
    })
    const renderer = computed(() => {
      return treeState.renderer
    })
    const listStyle = computed(() => {
      let indent = props.indent

      if (typeof indent === 'number') {
        indent = `${indent}px`
      }

      return {
        paddingLeft: indent
      }
    })

    provide(
      TREE_NODE_STATE,
      reactive({
        disabled: isDisabled,
        readonly: isReadonly
      })
    )

    function setValue<T = unknown>(key: keyof TreeNodeOptions, value: T) {
      const node = props.node

      node[key] = value
    }

    function handleClick() {
      treeState.handleNodeClick(props.node)
    }

    function handleToggleCheck(able = !props.checked) {
      if (isDisabled.value) return

      setValue('checked', able)
      setValue('partial', false)

      nextTick(() => {
        treeState.computeCheckedState(props.node, able)
      })
    }

    async function handleToggleExpand(able = !props.expanded) {
      if (props.loading || isDisabled.value) return

      if (able && treeState.boundAsyncLoad && !loaded) {
        setValue('loading', true)

        const result = await treeState.handleAsyncLoad(props.node)

        asyncLoadCallback(result)
      } else {
        setValue('expanded', able)

        if (able) {
          treeState.handleNodeExpand(props.node)
        } else {
          treeState.handleNodeReduce(props.node)
        }
      }
    }

    function handleToggleSelect(able = !props.selected) {
      if (isDisabled.value) return

      if (props.floorSelect && props.children?.length) {
        return handleToggleExpand()
      }

      setValue('selected', !isReadonly.value && able)

      if (isReadonly.value || able) {
        treeState.handleNodeSelect(props.node)
      } else {
        treeState.handleNodeCancel(props.node)
      }
    }

    function asyncLoadCallback(success = true) {
      setValue('loading', false)
      setValue('expanded', success !== false)

      if (success) {
        loaded = true
        treeState.handleNodeExpand(props.node)
      }
    }

    function getNodeState() {
      return {
        el: nodeElement.value,
        arrow: arrowElement.value,
        node: props.node
      }
    }

    function handleDragStart() {
      if (!props.draggable) return

      treeState.handleNodeDragStart(getNodeState())
    }

    function handleDragOver(event: DragEvent) {
      if (!props.draggable) return

      event.preventDefault()
      treeState.handleNodeDragOver(getNodeState(), event)
    }

    function handleDrop(event: DragEvent) {
      if (!props.draggable) return

      event.preventDefault()
      treeState.handleNodeDrop(getNodeState())
    }

    function handleDragEnd() {
      if (!props.draggable) return

      treeState.handleNodeDragEnd(getNodeState())
    }

    function getNodeChildren(node: TreeNodeOptions) {
      return node[props.childrenKey] as TreeNodeOptions[]
    }

    return {
      prefix,

      isDisabled,
      isReadonly,
      className,
      showChildren,
      hasArrow,
      hasCheckbox,
      renderer,
      listStyle,

      wrapper: nodeElement,
      arrowEl: arrowElement,

      handleClick,
      handleToggleCheck,
      handleToggleExpand,
      handleToggleSelect,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnd,
      getNodeChildren
    }
  }
})
</script>
