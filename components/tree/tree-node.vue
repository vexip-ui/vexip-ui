<script setup lang="ts">
import { Checkbox } from '@/components/checkbox'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'

import { computed, inject, nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'

import { useIcons, useNameHelper } from '@vexip-ui/config'
import { useModifier, useRtl } from '@vexip-ui/hooks'
import { decide, isNull } from '@vexip-ui/utils'
import { TREE_STATE } from './symbol'

import type { PropType } from 'vue'
import type { TreeNodeProps } from './symbol'

defineOptions({ name: 'TreeNode', inheritAttrs: false })

const props = defineProps({
  node: {
    type: Object as PropType<TreeNodeProps>,
    default: () => ({})
  }
})

const treeState = inject(TREE_STATE)!

const nh = useNameHelper('tree')
const icons = useIcons()

const { isRtl } = useRtl()

const wrapper = ref<HTMLElement>()
const arrowEl = ref<HTMLElement>()

const parentState = computed(() => {
  return props.node.parent ? treeState.nodeStates.get(props.node.parent) : undefined
})

useModifier({
  target: wrapper,
  passive: false,
  onKeyDown: (event, modifier) => {
    if (treeState.expanding) return

    decide(
      [
        [
          () => modifier.up || modifier.down,
          () => treeState.handleHittingChange(modifier.up ? 'up' : 'down')
        ],
        [
          () => modifier.left || modifier.right,
          () => {
            const hasChild = props.node.children?.length > 0

            if (modifier.right && props.node.expanded && hasChild) {
              treeState.handleHittingChange('down')
            } else if (modifier.left && (!props.node.expanded || !hasChild)) {
              treeState.handleNodeHitting(parentState.value?.el)
            } else {
              toggleExpanded(modifier.right)
            }
          }
        ],
        [() => hasCheckbox.value && modifier.space, handleToggleCheck],
        [() => modifier.enter, handleToggleSelect]
      ],
      {
        beforeMatchAny: () => {
          event.preventDefault()
          event.stopPropagation()
        },
        afterMatchAny: modifier.resetAll
      }
    )
  }
})

const loaded = ref(!treeState.boundAsyncLoad || props.node.loaded)
const loadFail = ref(treeState.boundAsyncLoad && props.node.loadFail)
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
    [nh.bem('node', 'focused')]: focused.value,
    [nh.bem('node', 'selected')]: props.node.selected,
    [nh.bem('node', 'expanded')]: props.node.expanded,
    [nh.bem('node', 'disabled')]: isDisabled.value,
    [nh.bem('node', 'readonly')]: isReadonly.value,
    [nh.bem('node', 'secondary')]: secondary.value,
    [nh.bem('node', 'dragging')]: dragging.value,
    [nh.bem('node', 'drag-over')]: isDragOver.value,
    [nh.bem('node', 'link-line')]: hasLinkLine.value,
    [nh.bem('node', 'no-arrow')]: !hasArrow.value,
    [nh.bem('node', 'is-floor')]: treeState.floorSelect && props.node.children?.length,
    [nh.bem('node', 'loaded')]: loaded.value,
    [nh.bem('node', 'load-fail')]: loadFail.value
  }
})
const isLeaf = computed(() => {
  const isLeaf = props.node.isLeaf

  let leafSign: boolean | 'auto' = 'auto'
  let asyncLoad = false

  if (isNull(isLeaf) || isLeaf === 'auto') {
    leafSign = 'auto'
    asyncLoad = treeState.boundAsyncLoad
  } else {
    leafSign = isLeaf
  }

  return leafSign === 'auto'
    ? !(props.node.children?.length || (asyncLoad && !loaded.value))
    : !!leafSign
})
const hasArrow = computed(() => {
  return isNull(props.node.arrow) || props.node.arrow === 'auto'
    ? treeState.arrow === 'auto'
      ? !isLeaf.value
      : treeState.arrow
    : props.node.arrow
})
const hasCheckbox = computed(() => {
  const checkbox = props.node.checkbox

  return isNull(checkbox) ? treeState.checkbox : checkbox
})
// const renderer = computed(() => treeState.renderer)
const suffixCheckbox = computed(() => treeState.suffixCheckbox)
const nodeState = reactive({
  el: wrapper,
  depth: computed(() => props.node.depth),
  disabled: isDisabled,
  readonly: isReadonly
})

watch([() => treeState.boundAsyncLoad, () => props.node.loaded], values => {
  loaded.value = !values[0] || values[1]
})
watch([() => treeState.boundAsyncLoad, () => props.node.loadFail], values => {
  loadFail.value = !values[0] || values[1]
})
watch(
  () => props.node.id,
  (value, prev) => {
    treeState.nodeStates.delete(prev)
    treeState.nodeStates.set(value, nodeState)
  }
)

treeState.nodeStates.set(props.node.id, nodeState)

let dragTimer: ReturnType<typeof setTimeout>

onBeforeUnmount(() => {
  clearTimeout(dragTimer)
  treeState.nodeStates.set(props.node.id, nodeState)
})

// function updateVisible() {
//   treeState.updateVisibleNodeEls()
// }

function setValue<T = unknown>(key: keyof TreeNodeProps, value: T) {
  ;(props.node as any)[key] = value
}

function handleClick() {
  treeState.handleNodeClick(props.node)

  if (treeState.blockEffect) {
    handleLabelClick()
  }
}

function handleToggleCheck(able = !props.node.checked) {
  if (isDisabled.value || props.node.checkDisabled) return

  setValue('checked', able)
  setValue('partial', false)

  nextTick(() => {
    treeState.computeCheckedState(props.node, able)
  })
}

async function toggleExpanded(able = !props.node.expanded) {
  if (
    treeState.expanding ||
    props.node.loading ||
    isDisabled.value ||
    props.node.expandDisabled ||
    isLeaf.value
  ) {
    return
  }

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
    return toggleExpanded()
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
    setValue('loaded', true)
    setValue('loadFail', false)
    treeState.handleNodeExpand(props.node)
  } else {
    setValue('loadFail', true)
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

  clearTimeout(dragTimer)
  event.stopPropagation()
  event.preventDefault()

  isDragOver.value = true

  treeState.handleNodeDragOver(getNodeState(), event)
}

function handleDragLeave(event: DragEvent) {
  if (!treeState.draggable) return

  clearTimeout(dragTimer)
  event.preventDefault()

  dragTimer = setTimeout(() => {
    isDragOver.value = false
  }, 100)
}

function handleDrop(event: DragEvent) {
  if (!treeState.draggable || !treeState.dragging) return

  clearTimeout(dragTimer)
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
</script>

<template>
  <li
    v-bind="$attrs"
    ref="wrapper"
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
      :line-count="0"
      :line-indexes="node.lineIndexes"
      :toggle-check="handleToggleCheck"
      :toggle-expand="toggleExpanded"
      :toggle-select="handleToggleSelect"
    >
      <template v-if="hasLinkLine">
        <div
          v-for="(lineIndex, index) in node.lineIndexes"
          :key="index"
          :class="[
            nh.be('link-line'),
            nh.bem('link-line', 'vertical'),
            !index && nh.bem('link-line', 'first')
          ]"
          :style="{ [nh.cv('link-line-index')]: lineIndex }"
          aria-hidden="true"
        ></div>

        <div
          :class="[nh.be('link-line'), nh.bem('link-line', 'horizontal')]"
          aria-hidden="true"
        ></div>
      </template>
      <div
        :class="{
          [nh.be('content')]: true,
          [nh.bem('content', 'effect')]: treeState.blockEffect,
          [nh.bem('content', 'disabled')]:
            treeState.blockEffect && (isDisabled || node.selectDisabled)
        }"
      >
        <span
          ref="arrowEl"
          :class="{
            [nh.be('arrow')]: true,
            [nh.bem('arrow', 'transparent')]: !node.loading && !hasArrow,
            [nh.bem('arrow', 'expanded')]: node.expanded,
            [nh.bem('arrow', 'disabled')]: isDisabled || node.expandDisabled
          }"
          :aria-hidden="!node.loading && !hasArrow"
          @click.stop="toggleExpanded()"
        >
          <Icon v-if="node.loading" v-bind="icons.loading" label="loading"></Icon>
          <slot
            v-else
            name="arrow"
            :data="node.data"
            :node="node"
            :depth="node.depth"
            :focused="focused"
          >
            <Icon v-if="treeState.arrowIcon" :icon="treeState.arrowIcon"></Icon>
            <Icon v-else v-bind="isRtl ? icons.angleLeft : icons.angleRight"></Icon>
          </slot>
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
            [nh.bem('label', 'effect')]: !treeState.blockEffect,
            [nh.bem('label', 'disabled')]:
              !treeState.blockEffect && (isDisabled || node.selectDisabled)
          }"
          @click="!treeState.blockEffect && handleLabelClick()"
        >
          <div v-if="treeState.prefixRenderer || $slots.prefix" :class="nh.be('prefix')">
            <Renderer
              v-if="treeState.prefixRenderer"
              :renderer="treeState.prefixRenderer"
              :data="{ node, depth: node.depth, data: node.data, focused }"
            ></Renderer>
            <slot
              v-else
              name="prefix"
              :data="node.data"
              :node="node"
              :depth="node.depth"
              :focused="focused"
            ></slot>
          </div>
          <div :class="nh.be('text')">
            <Renderer
              v-if="treeState.renderer"
              :renderer="treeState.renderer"
              :data="{ node, depth: node.depth, data: node.data, focused }"
            ></Renderer>
            <slot
              v-else
              name="label"
              :data="node.data"
              :node="node"
              :depth="node.depth"
              :focused="focused"
            >
              {{ node.data[treeState.labelKey] }}
            </slot>
          </div>
          <div v-if="treeState.suffixRenderer || $slots.suffix" :class="nh.be('suffix')">
            <Renderer
              v-if="treeState.suffixRenderer"
              :renderer="treeState.suffixRenderer"
              :data="{ node, depth: node.depth, data: node.data, focused }"
            ></Renderer>
            <slot
              v-else
              name="suffix"
              :data="node.data"
              :node="node"
              :depth="node.depth"
              :focused="focused"
            ></slot>
          </div>
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
