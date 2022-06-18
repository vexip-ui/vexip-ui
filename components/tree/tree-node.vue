<template>
  <li
    v-if="visible"
    ref="wrapper"
    :class="className"
    :draggable="draggable"
    @click.left="handleClick"
    @dragstart.stop="handleDragStart"
    @dragover="handleDragOver"
    @dragend="handleDragEnd"
    @drop="handleDrop"
  >
    <slot
      :data="node.data"
      :node="node"
      :depth="depth"
      :toggle-check="handleToggleCheck"
      :toggle-expand="handleToggleExpand"
      :toggle-select="handleToggleSelect"
    >
      <div :class="nh.be('content')" :style="contentStyle">
        <span
          ref="arrowEl"
          :class="{
            [nh.be('arrow')]: true,
            [nh.bem('arrow', 'transparent')]: !loading && !hasArrow,
            [nh.bem('arrow', 'expanded')]: expanded
          }"
          @click="handleToggleExpand()"
        >
          <Icon v-if="loading" pulse><Spinner></Spinner></Icon>
          <Icon v-else><ChevronRight></ChevronRight></Icon>
        </span>
        <Checkbox
          v-if="hasCheckbox && !suffixCheckbox"
          :class="nh.be('checkbox')"
          :control="hasArrow"
          :checked="checked"
          :disabled="isDisabled"
          :partial="partial"
          @click.prevent.stop="handleToggleCheck()"
        ></Checkbox>
        <div
          :class="{
            [nh.be('label')]: true,
            [nh.bem('label', 'selected')]: selected,
            [nh.bem('label', 'disabled')]: isDisabled,
            [nh.bem('label', 'readonly')]: isReadonly,
            [nh.bem('label', 'is-floor')]: floorSelect && node.children?.length
          }"
          @click="handleToggleSelect()"
        >
          <Renderer
            v-if="renderer"
            :renderer="renderer"
            :data="{ node, depth, data: node.data }"
          ></Renderer>
          <template v-else>
            <slot
              name="label"
              :data="node.data"
              :node="node"
              :depth="depth"
            >
              {{ data[labelKey] }}
            </slot>
          </template>
        </div>
        <Checkbox
          v-if="hasCheckbox && suffixCheckbox"
          :class="[nh.be('checkbox'), nh.bem('checkbox', 'suffix')]"
          :control="hasArrow"
          :checked="checked"
          :disabled="isDisabled"
          :partial="partial"
          @click.prevent.stop="handleToggleCheck()"
        ></Checkbox>
      </div>
    </slot>
    <CollapseTransition :appear="appear">
      <ul v-if="showChildren" :class="nh.be('list')">
        <TreeNode
          v-for="(item, index) in node.children"
          v-show="item.visible"
          :key="index"
          v-bind="(item as any)"
          :node="item"
          :label-key="labelKey"
          :indent="indent"
          :draggable="draggable"
          :appear="appear"
          :floor-select="floorSelect"
        >
          <template
            #default="{
              data: childData,
              node: childNode,
              depth: childDepth,
              toggleCheck,
              toggleExpand,
              toggleSelect
            }"
          >
            <slot
              :data="childData"
              :node="childNode"
              :depth="childDepth"
              :toggle-check="toggleCheck"
              :toggle-expand="toggleExpand"
              :toggle-select="toggleSelect"
            ></slot>
          </template>
          <template #label="{ data: childData, node: childNode }">
            <slot name="label" :data="childData" :node="childNode"></slot>
          </template>
        </TreeNode>
      </ul>
    </CollapseTransition>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, provide, inject, nextTick } from 'vue'
import { Checkbox } from '@/components/checkbox'
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { useNameHelper } from '@vexip-ui/config'
import { isNull } from '@vexip-ui/utils'
import { ChevronRight, Spinner } from '@vexip-ui/icons'
import { TREE_STATE, TREE_NODE_STATE } from './symbol'

import type { PropType } from 'vue'
import type { TreeNodeProps } from './symbol'

export default defineComponent({
  name: 'TreeNode',
  components: {
    Checkbox,
    CollapseTransition,
    Icon,
    Renderer,
    ChevronRight,
    Spinner
  },
  inheritAttrs: false,
  props: {
    node: {
      type: Object as PropType<TreeNodeProps>,
      default: () => ({})
    },
    data: {
      type: Object,
      default: () => ({})
    },
    arrow: {
      type: [Boolean, String] as PropType<boolean | 'auto'>,
      default: 'auto',
      validator: (value: boolean | 'auto') => typeof value === 'boolean' || value === 'auto'
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
    checked: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loaded: {
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
      default: '16px'
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
  setup(props) {
    const treeState = inject(TREE_STATE)!
    const parentState = inject(TREE_NODE_STATE)!

    const nh = useNameHelper('tree')

    const nodeElement = ref<HTMLElement | null>(null)
    const arrowElement = ref<HTMLElement | null>(null)

    const loaded = ref(props.loaded)

    const isDisabled = computed(() => {
      return parentState.disabled || props.disabled
    })
    const isReadonly = computed(() => {
      return parentState.readonly || props.readonly
    })
    const depth = computed(() => {
      return parentState.depth + 1
    })
    const className = computed(() => {
      return {
        [nh.be('node')]: true,
        [nh.bem('node', 'selected')]: props.selected,
        [nh.bem('node', 'expanded')]: props.expanded,
        [nh.bem('node', 'disabled')]: isDisabled.value,
        [nh.bem('node', 'readonly')]: isReadonly.value
      }
    })
    const contentStyle = computed(() => {
      let indent = props.indent

      if (typeof indent === 'number') {
        indent = `${indent}px`
      }

      return {
        paddingLeft: depth.value
          ? depth.value === 1 ? indent : `calc(${depth.value} * ${indent})`
          : 0
      }
    })
    const showChildren = computed(() => {
      return props.expanded && props.node.children?.length > 0
    })
    const hasArrow = computed(() => {
      const arrow = props.arrow

      let arrowSign: boolean | 'auto' = 'auto'
      let asyncLoad = false

      if (isNull(arrow) || arrow === 'auto') {
        if (treeState) {
          arrowSign = treeState.arrow
          asyncLoad = treeState.boundAsyncLoad
        }
      } else {
        arrowSign = arrow
      }

      return arrowSign === 'auto'
        ? !!props.node.children?.length || (!loaded.value && asyncLoad)
        : !!arrowSign
    })
    const hasCheckbox = computed(() => {
      const checkbox = props.checkbox

      return isNull(checkbox) ? treeState.checkbox : checkbox
    })
    const renderer = computed(() => treeState.renderer)
    const suffixCheckbox = computed(() => treeState.suffixCheckbox)

    provide(
      TREE_NODE_STATE,
      reactive({
        depth,
        disabled: isDisabled,
        readonly: isReadonly
      })
    )

    watch(
      () => props.loaded,
      value => {
        loaded.value = value
      }
    )

    function setValue<T = unknown>(key: keyof TreeNodeProps, value: T) {
      (props.node as any)[key] = value
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

      if (able && treeState.boundAsyncLoad && !loaded.value) {
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

      if (props.floorSelect && props.node.children?.length) {
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
        loaded.value = true
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
      if (!props.draggable || !treeState.dragging) return

      event.stopPropagation()
      event.preventDefault()
      treeState.handleNodeDragOver(getNodeState(), event)
    }

    function handleDrop(event: DragEvent) {
      if (!props.draggable || !treeState.dragging) return

      event.stopPropagation()
      event.preventDefault()
      treeState.handleNodeDrop(getNodeState())
    }

    function handleDragEnd(event: DragEvent) {
      if (!props.draggable || !treeState.dragging) return

      event.stopPropagation()
      treeState.handleNodeDragEnd(getNodeState())
    }

    function getNodeChildren(node: TreeNodeProps) {
      return node.children
    }

    return {
      nh,

      isDisabled,
      isReadonly,
      depth,
      className,
      contentStyle,
      showChildren,
      hasArrow,
      hasCheckbox,
      renderer,
      suffixCheckbox,

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
