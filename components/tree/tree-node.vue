<template>
  <li
    v-if="visible && (matched || childMatched)"
    ref="wrapper"
    v-bind="$attrs"
    :class="className"
    :draggable="draggable"
    tabindex="-1"
    :aria-disabled="isDisabled"
    :aria-grabbed="draggable && dragging ? 'true' : undefined"
    :style="{ [nh.cv('depth')]: depth }"
    @click.left="handleClick"
    @focus="focused = true"
    @blur="focused = false"
    @dragstart.stop="handleDragStart"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @dragend="handleDragEnd"
    @drop="handleDrop"
  >
    <slot
      :data="node.data"
      :node="node"
      :depth="depth"
      :focused="focused"
      :toggle-check="handleToggleCheck"
      :toggle-expand="handleToggleExpand"
      :toggle-select="handleToggleSelect"
    >
      <div :class="nh.be('content')">
        <span
          ref="arrowEl"
          :class="{
            [nh.be('arrow')]: true,
            [nh.bem('arrow', 'transparent')]: !loading && !hasArrow,
            [nh.bem('arrow', 'expanded')]: expanded,
            [nh.bem('arrow', 'disabled')]: isDisabled || expandDisabled
          }"
          :aria-hidden="!loading && !hasArrow"
          @click.stop="handleToggleExpand()"
        >
          <Icon v-if="loading" v-bind="icons.loading"></Icon>
          <Icon v-else v-bind="icons.arrowRight"></Icon>
        </span>
        <Checkbox
          v-if="hasCheckbox && !suffixCheckbox"
          inherit
          :class="nh.be('checkbox')"
          :tab-index="-1"
          :control="hasArrow"
          :checked="checked"
          :disabled="isDisabled || checkDisabled"
          :partial="partial"
          @click.prevent.stop="handleToggleCheck()"
        ></Checkbox>
        <div
          :class="{
            [nh.be('label')]: true,
            [nh.bem('label', 'focused')]: focused,
            [nh.bem('label', 'selected')]: selected,
            [nh.bem('label', 'disabled')]: isDisabled || selectDisabled,
            [nh.bem('label', 'readonly')]: isReadonly,
            [nh.bem('label', 'is-floor')]: floorSelect && node.children?.length,
            [nh.bem('label', 'secondary')]: secondary
          }"
          @click="handleLabelClick()"
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
              :focused="focused"
            >
              {{ data[labelKey] }}
            </slot>
          </template>
        </div>
        <Checkbox
          v-if="hasCheckbox && suffixCheckbox"
          inherit
          :class="[nh.be('checkbox'), nh.bem('checkbox', 'suffix')]"
          :tab-index="-1"
          :control="hasArrow"
          :checked="checked"
          :disabled="isDisabled || checkDisabled"
          :partial="partial"
          @click.prevent.stop="handleToggleCheck()"
        ></Checkbox>
      </div>
    </slot>
  </li>
  <CollapseTransition :appear="appear" @after-enter="updateVisible" @after-leave="updateVisible">
    <ul
      v-if="showChildren"
      :class="[nh.be('list'), !last && hasLinkLine && nh.bem('list', 'link-line')]"
      :style="{ [nh.cv('depth')]: depth }"
    >
      <TreeNode
        v-for="(item, index) in node.children"
        :key="index"
        v-bind="nodeProps!(item.data, item)"
        :node="item"
        :data="item.data"
        :arrow="item.arrow"
        :checkbox="item.checkbox"
        :appear="appear"
        :visible="item.visible"
        :selected="item.selected"
        :expanded="item.expanded"
        :disabled="item.disabled"
        :label-key="labelKey"
        :checked="item.checked"
        :loading="item.loading"
        :loaded="item.loaded"
        :partial="item.partial"
        :readonly="item.readonly"
        :indent="indent"
        :draggable="draggable"
        :floor-select="floorSelect"
        :matched="item.matched"
        :child-matched="item.childMatched"
        :upper-matched="item.upperMatched"
        :node-props="nodeProps"
        :last="index === node.children.length - 1"
        :select-disabled="item.selectDisabled"
        :expand-disabled="item.expandDisabled"
        :check-disabled="item.checkDisabled"
      >
        <template #default="payload: any">
          <slot v-bind="payload"></slot>
        </template>
        <template #label="payload: any">
          <slot name="label" v-bind="payload"></slot>
        </template>
      </TreeNode>
    </ul>
  </CollapseTransition>
</template>

<script lang="ts">
import { Checkbox } from '@/components/checkbox'
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'

import { computed, defineComponent, inject, nextTick, provide, reactive, ref, watch } from 'vue'

import { useIcons, useNameHelper } from '@vexip-ui/config'
import { useModifier } from '@vexip-ui/hooks'
import { isNull, noop } from '@vexip-ui/utils'
import { TREE_NODE_STATE, TREE_STATE } from './symbol'

import type { PropType } from 'vue'
import type { NodePropsFn, TreeNodeProps } from './symbol'

export default defineComponent({
  name: 'TreeNode',
  components: {
    Checkbox,
    CollapseTransition,
    Icon,
    Renderer
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
    },
    matched: {
      type: Boolean,
      default: true
    },
    childMatched: {
      type: Boolean,
      default: false
    },
    upperMatched: {
      type: Boolean,
      default: false
    },
    nodeProps: {
      type: Function as PropType<NodePropsFn>,
      default: noop
    },
    last: {
      type: Boolean,
      default: false
    },
    selectDisabled: {
      type: Boolean,
      default: false
    },
    expandDisabled: {
      type: Boolean,
      default: false
    },
    checkDisabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const treeState = inject(TREE_STATE)!
    const parentState = inject(TREE_NODE_STATE)!

    const nh = useNameHelper('tree')

    const nodeElement = ref<HTMLElement>()
    const arrowElement = ref<HTMLElement>()

    useModifier({
      target: nodeElement,
      passive: false,
      onKeyDown: (event, modifier) => {
        const prevent = () => {
          event.preventDefault()
          event.stopPropagation()
        }

        if (modifier.up || modifier.down) {
          prevent()
          treeState.handleHittingChange(modifier.up ? 'up' : 'down')
        } else if (modifier.left || modifier.right) {
          prevent()
          const hasChild = props.node.children?.length > 0

          if (modifier.right && props.expanded && hasChild) {
            treeState.handleHittingChange('down')
          } else if (modifier.left && (!props.expanded || !hasChild)) {
            treeState.handleNodeHitting(parentState.el)
          } else {
            handleToggleExpand(modifier.right)
          }
        } else if (hasCheckbox.value && modifier.space) {
          prevent()
          handleToggleCheck()
        } else if (modifier.enter) {
          prevent()
          handleToggleSelect()
        }
      }
    })

    const loaded = ref(props.loaded)
    const dragging = ref(false)
    const isDragOver = ref(false)
    const focused = ref(false)

    const isDisabled = computed(() => {
      return (!treeState.noCascaded && parentState.disabled) || props.disabled
    })
    const isReadonly = computed(() => {
      return (!treeState.noCascaded && parentState.readonly) || props.readonly
    })
    const depth = computed(() => parentState.depth + 1)
    const secondary = computed(() => !props.matched && (props.childMatched || props.upperMatched))
    const hasLinkLine = computed(() => !!treeState.linkLine && depth.value > 0)
    const className = computed(() => {
      return {
        [nh.be('node')]: true,
        [nh.bem('node', 'last')]: props.last,
        [nh.bem('node', 'selected')]: props.selected,
        [nh.bem('node', 'expanded')]: props.expanded,
        [nh.bem('node', 'disabled')]: isDisabled.value,
        [nh.bem('node', 'readonly')]: isReadonly.value,
        [nh.bem('node', 'secondary')]: secondary.value,
        [nh.bem('node', 'dragging')]: dragging.value,
        [nh.bem('node', 'drag-over')]: isDragOver.value,
        [nh.bem('node', 'link-line')]: hasLinkLine.value,
        [nh.bem('node', 'no-arrow')]: !hasArrow.value
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
        el: nodeElement,
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

    function updateVisible() {
      treeState.updateVisibleNodeEls()
    }

    function setValue<T = unknown>(key: keyof TreeNodeProps, value: T) {
      (props.node as any)[key] = value
    }

    function handleClick() {
      treeState.handleNodeClick(props.node)
    }

    function handleToggleCheck(able = !props.checked) {
      if (isDisabled.value || props.checkDisabled) return

      setValue('checked', able)
      setValue('partial', false)

      nextTick(() => {
        treeState.computeCheckedState(props.node, able)
      })
    }

    async function handleToggleExpand(able = !props.expanded) {
      if (props.loading || isDisabled.value || props.expandDisabled) return

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
      if (isDisabled.value || props.selectDisabled) return

      if (props.floorSelect) {
        return handleToggleExpand()
      }

      setValue('selected', !isReadonly.value && able)

      if (isReadonly.value || able) {
        treeState.handleNodeSelect(props.node)
      } else {
        treeState.handleNodeCancel(props.node)
      }
    }

    function handleLabelClick() {
      treeState.handleLabelClick(props.node)
      handleToggleSelect()
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

      dragging.value = true
      treeState.handleNodeDragStart(getNodeState())
    }

    function handleDragOver(event: DragEvent) {
      if (!props.draggable || !treeState.dragging) return

      event.stopPropagation()
      event.preventDefault()
      isDragOver.value = true
      treeState.handleNodeDragOver(getNodeState(), event)
    }

    function handleDragLeave(event: DragEvent) {
      if (!props.draggable) return

      event.preventDefault()
      isDragOver.value = false
    }

    function handleDrop(event: DragEvent) {
      if (!props.draggable || !treeState.dragging) return

      event.stopPropagation()
      event.preventDefault()
      isDragOver.value = false
      treeState.handleNodeDrop(getNodeState())
    }

    function handleDragEnd(event: DragEvent) {
      if (!props.draggable || !treeState.dragging) return

      event.stopPropagation()
      dragging.value = false
      treeState.handleNodeDragEnd(getNodeState())
    }

    function getNodeChildren(node: TreeNodeProps) {
      return node.children
    }

    return {
      nh,
      icons: useIcons(),

      dragging,
      focused,

      isDisabled,
      isReadonly,
      depth,
      secondary,
      hasLinkLine,
      className,
      showChildren,
      hasArrow,
      hasCheckbox,
      renderer,
      suffixCheckbox,

      wrapper: nodeElement,
      arrowEl: arrowElement,

      updateVisible,
      handleClick,
      handleToggleCheck,
      handleToggleExpand,
      handleToggleSelect,
      handleLabelClick,
      handleDragStart,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      handleDragEnd,
      getNodeChildren
    }
  }
})
</script>
