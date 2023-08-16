<template>
  <li
    ref="wrapper"
    v-bind="$attrs"
    :class="className"
    :draggable="treeState.draggable"
    tabindex="-1"
    :aria-disabled="isDisabled"
    :aria-grabbed="treeState.draggable && dragging ? 'true' : undefined"
    :style="{ [nh.cv('depth')]: node.depth }"
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
      :depth="node.depth"
      :focused="focused"
      :line-count="node.depth - node.inLastCount"
      :toggle-check="handleToggleCheck"
      :toggle-expand="handleToggleExpand"
      :toggle-select="handleToggleSelect"
    >
      <template v-if="hasLinkLine">
        <div
          v-for="n in node.depth - node.inLastCount"
          :key="n"
          :class="[
            nh.be('link-line'),
            nh.bem('link-line', 'vertical'),
            n === 1 && nh.bem('link-line', 'first')
          ]"
          :style="{ [nh.cv('link-line-index')]: n - 1 }"
          aria-hidden="true"
        ></div>
        <div
          :class="[nh.be('link-line'), nh.bem('link-line', 'horizontal')]"
          aria-hidden="true"
        ></div>
      </template>
      <div :class="nh.be('content')">
        <span
          ref="arrowEl"
          :class="{
            [nh.be('arrow')]: true,
            [nh.bem('arrow', 'transparent')]: !node.loading && !hasArrow,
            [nh.bem('arrow', 'expanded')]: node.expanded,
            [nh.bem('arrow', 'disabled')]: isDisabled || node.expandDisabled
          }"
          :aria-hidden="!node.loading && !hasArrow"
          @click.stop="handleToggleExpand()"
        >
          <Icon v-if="node.loading" v-bind="icons.loading"></Icon>
          <Icon v-else v-bind="isRtl ? icons.arrowLeft : icons.arrowRight"></Icon>
        </span>
        <Checkbox
          v-if="hasCheckbox && !suffixCheckbox"
          inherit
          :class="nh.be('checkbox')"
          :tab-index="-1"
          :control="hasArrow"
          :checked="node.checked"
          :disabled="isDisabled || node.checkDisabled"
          :partial="node.partial"
          @click.prevent.stop="handleToggleCheck()"
        ></Checkbox>
        <div
          :class="{
            [nh.be('label')]: true,
            [nh.bem('label', 'focused')]: focused,
            [nh.bem('label', 'selected')]: node.selected,
            [nh.bem('label', 'disabled')]: isDisabled || node.selectDisabled,
            [nh.bem('label', 'readonly')]: isReadonly,
            [nh.bem('label', 'is-floor')]: treeState.floorSelect && node.children?.length,
            [nh.bem('label', 'secondary')]: secondary
          }"
          @click="handleLabelClick()"
        >
          <Renderer
            v-if="renderer"
            :renderer="renderer"
            :data="{ node, depth: node.depth, data: node.data }"
          ></Renderer>
          <template v-else>
            <slot
              name="label"
              :data="node.data"
              :node="node"
              :depth="node.depth"
              :focused="focused"
            >
              {{ node.data[treeState.labelKey] }}
            </slot>
          </template>
        </div>
        <Checkbox
          v-if="hasCheckbox && suffixCheckbox"
          inherit
          :class="[nh.be('checkbox'), nh.bem('checkbox', 'suffix')]"
          :tab-index="-1"
          :control="hasArrow"
          :checked="node.checked"
          :disabled="isDisabled || node.checkDisabled"
          :partial="node.partial"
          @click.prevent.stop="handleToggleCheck()"
        ></Checkbox>
      </div>
    </slot>
  </li>
</template>

<script lang="ts">
import { Checkbox } from '@/components/checkbox'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'

import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onBeforeUnmount,
  reactive,
  ref,
  watch
} from 'vue'

import { useIcons, useNameHelper } from '@vexip-ui/config'
import { useModifier, useRtl } from '@vexip-ui/hooks'
import { isNull } from '@vexip-ui/utils'
import { TREE_STATE } from './symbol'

import type { PropType } from 'vue'
import type { TreeNodeProps } from './symbol'

export default defineComponent({
  name: 'TreeNode',
  components: {
    Checkbox,
    Icon,
    Renderer
  },
  inheritAttrs: false,
  props: {
    node: {
      type: Object as PropType<TreeNodeProps>,
      default: () => ({})
    }
  },
  setup(props) {
    const treeState = inject(TREE_STATE)!

    const { isRtl } = useRtl()

    const nh = useNameHelper('tree')

    const wrapper = ref<HTMLElement>()
    const arrowEl = ref<HTMLElement>()

    const parentState = computed(() => {
      return treeState.nodeStates.get(props.node.parent)
    })

    useModifier({
      target: wrapper,
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

          if (modifier.right && props.node.expanded && hasChild) {
            treeState.handleHittingChange('down')
          } else if (modifier.left && (!props.node.expanded || !hasChild)) {
            treeState.handleNodeHitting(parentState.value?.el)
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

    const loaded = ref(props.node.loaded)
    const dragging = ref(false)
    const isDragOver = ref(false)
    const focused = ref(false)

    const isDisabled = computed(() => {
      return (!treeState.noCascaded && parentState.value?.disabled) || props.node.disabled
    })
    const isReadonly = computed(() => {
      return (!treeState.noCascaded && parentState.value?.readonly) || props.node.readonly
    })
    // const depth = computed(() => parentState.depth + 1)
    const secondary = computed(
      () => !props.node.matched && (props.node.childMatched || props.node.upperMatched)
    )
    const hasLinkLine = computed(() => !!treeState.linkLine && props.node.depth > 0)
    const className = computed(() => {
      return {
        [nh.be('node')]: true,
        [nh.bem('node', 'last')]: props.node.last,
        [nh.bem('node', 'selected')]: props.node.selected,
        [nh.bem('node', 'expanded')]: props.node.expanded,
        [nh.bem('node', 'disabled')]: isDisabled.value,
        [nh.bem('node', 'readonly')]: isReadonly.value,
        [nh.bem('node', 'secondary')]: secondary.value,
        [nh.bem('node', 'dragging')]: dragging.value,
        [nh.bem('node', 'drag-over')]: isDragOver.value,
        [nh.bem('node', 'link-line')]: hasLinkLine.value,
        [nh.bem('node', 'no-arrow')]: !hasArrow.value
      }
    })
    const hasArrow = computed(() => {
      const arrow = props.node.arrow

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
      const checkbox = props.node.checkbox

      return isNull(checkbox) ? treeState.checkbox : checkbox
    })
    const renderer = computed(() => treeState.renderer)
    const suffixCheckbox = computed(() => treeState.suffixCheckbox)
    const nodeState = reactive({
      el: wrapper,
      depth: computed(() => props.node.depth),
      disabled: isDisabled,
      readonly: isReadonly
    })

    watch(
      () => props.node.loaded,
      value => {
        loaded.value = value
      }
    )
    watch(
      () => props.node.id,
      (value, prev) => {
        treeState.nodeStates.delete(prev)
        treeState.nodeStates.set(value, nodeState)
      }
    )

    treeState.nodeStates.set(props.node.id, nodeState)

    onBeforeUnmount(() => {
      treeState.nodeStates.set(props.node.id, nodeState)
    })

    // function updateVisible() {
    //   treeState.updateVisibleNodeEls()
    // }

    function setValue<T = unknown>(key: keyof TreeNodeProps, value: T) {
      (props.node as any)[key] = value
    }

    function handleClick() {
      treeState.handleNodeClick(props.node)
    }

    function handleToggleCheck(able = !props.node.checked) {
      if (isDisabled.value || props.node.checkDisabled) return

      setValue('checked', able)
      setValue('partial', false)

      nextTick(() => {
        treeState.computeCheckedState(props.node, able)
      })
    }

    async function handleToggleExpand(able = !props.node.expanded) {
      if (props.node.loading || isDisabled.value || props.node.expandDisabled) return

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

    function handleToggleSelect(able = !props.node.selected) {
      if (isDisabled.value || props.node.selectDisabled) return

      if (treeState.floorSelect) {
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
        el: wrapper.value,
        arrow: arrowEl.value,
        node: props.node
      }
    }

    function handleDragStart() {
      if (!treeState.draggable) return

      dragging.value = true
      treeState.handleNodeDragStart(getNodeState())
    }

    function handleDragOver(event: DragEvent) {
      if (!treeState.draggable || !treeState.dragging) return

      event.stopPropagation()
      event.preventDefault()
      isDragOver.value = true
      treeState.handleNodeDragOver(getNodeState(), event)
    }

    function handleDragLeave(event: DragEvent) {
      if (!treeState.draggable) return

      event.preventDefault()
      isDragOver.value = false
    }

    function handleDrop(event: DragEvent) {
      if (!treeState.draggable || !treeState.dragging) return

      event.stopPropagation()
      event.preventDefault()
      isDragOver.value = false
      treeState.handleNodeDrop(getNodeState())
    }

    function handleDragEnd(event: DragEvent) {
      if (!treeState.draggable || !treeState.dragging) return

      event.stopPropagation()
      dragging.value = false
      treeState.handleNodeDragEnd(getNodeState())
    }

    function getNodeChildren(node: TreeNodeProps) {
      return node.children
    }

    // function handleResize(entry: ResizeObserverEntry) {
    //   treeState.handleItemResize(props.node.id, entry)
    // }

    return {
      nh,
      icons: useIcons(),
      treeState,

      dragging,
      focused,

      isRtl,
      isDisabled,
      isReadonly,
      secondary,
      hasLinkLine,
      className,
      hasArrow,
      hasCheckbox,
      renderer,
      suffixCheckbox,

      wrapper,
      arrowEl,

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
