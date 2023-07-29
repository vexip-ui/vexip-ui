<template>
  <NativeScroll
    ref="scroll"
    :class="[nh.b(), nh.bs('vars'), props.inherit && nh.bm('inherit')]"
    use-y-bar
    role="tree"
    tabindex="-1"
    :aria-disabled="props.disabled"
    :aria-readonly="props.readonly"
    :style="style"
    @scroll="handleScroll"
    @resize="handleResize"
  >
    <ResizeObserver throttle @resize="refreshScroll">
      <div :style="listStyle">
        <span
          ref="trap"
          tabindex="0"
          aria-hidden="true"
          style="width: 0; height: 0; overflow: hidden; outline: none"
          @focus="handleTreeFocus"
        ></span>
        <ul :class="nh.be('list')" :style="itemsStyle">
          <TreeNode
            v-for="(node, index) in treeNodes"
            v-bind="getNodeProps(node.data, node)"
            :key="node.id ?? index"
            :node="node"
            :data="node.data"
            :arrow="node.arrow"
            :checkbox="node.checkbox"
            :appear="props.appear"
            :visible="node.visible"
            :selected="node.selected"
            :expanded="node.expanded"
            :disabled="node.disabled"
            :label-key="labelKey"
            :checked="node.checked"
            :loading="node.loading"
            :loaded="node.loaded"
            :partial="node.partial"
            :readonly="node.readonly"
            :indent="props.indent"
            :draggable="props.draggable"
            :floor-select="props.floorSelect"
            :matched="node.matched"
            :child-matched="node.childMatched"
            :upper-matched="node.upperMatched"
            :node-props="getNodeProps"
            :select-disabled="node.selectDisabled"
            :expand-disabled="node.expandDisabled"
            :check-disabled="node.checkDisabled"
          >
            <template #default="payload">
              <slot name="node" v-bind="payload"></slot>
            </template>
            <template #label="payload">
              <slot name="label" v-bind="payload"></slot>
            </template>
          </TreeNode>
        </ul>
        <div v-if="!props.data || !props.data.length || !anyMatched" :class="nh.be('empty-tip')">
          <slot name="empty">
            {{ props.emptyTip ?? locale.empty }}
          </slot>
        </div>
        <div
          v-if="props.draggable"
          v-show="indicatorShow"
          ref="indicator"
          :class="nh.be('indicator')"
        ></div>
      </div>
    </ResizeObserver>
  </NativeScroll>
</template>

<script lang="ts">
import { NativeScroll } from '@/components/native-scroll'
import { ResizeObserver } from '@/components/resize-observer'

import {
  computed,
  defineComponent,
  onMounted,
  provide,
  reactive,
  ref,
  toRef,
  watch,
  watchEffect
} from 'vue'

import TreeNode from './tree-node.vue'
import { emitEvent, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import { useMounted, useVirtual } from '@vexip-ui/hooks'
import {
  flatTree,
  isNull,
  isPromise,
  queryAll,
  removeArrayItem,
  transformTree
} from '@vexip-ui/utils'
import { treeProps } from './props'
import { DropType, TREE_NODE_STATE, TREE_STATE } from './symbol'

import type { NativeScrollExposed } from '@/components/native-scroll'
import type {
  Data,
  FilterFn,
  Key,
  TreeNodeInstance,
  TreeNodeKeyConfig,
  TreeNodeProps
} from './symbol'

const defaultKeyConfig: Required<TreeNodeKeyConfig> = {
  id: 'id',
  parent: 'parent',
  label: 'label',
  children: 'children',
  visible: 'visible',
  selected: 'selected',
  expanded: 'expanded',
  disabled: 'disabled',
  checked: 'checked',
  loading: 'loading',
  loaded: 'loaded',
  readonly: 'readonly',
  arrow: 'arrow',
  checkbox: 'checkbox',
  selectDisabled: 'selectDisabled',
  expandDisabled: 'expandDisabled',
  checkDisabled: 'checkDisabled'
}

export default defineComponent({
  name: 'Tree',
  components: {
    NativeScroll,
    ResizeObserver,
    TreeNode
  },
  props: treeProps,
  emits: [],
  setup(_props) {
    const props = useProps('tree', _props, {
      arrow: {
        default: 'auto',
        validator: value => typeof value === 'boolean' || value === 'auto'
      },
      data: {
        default: () => [],
        static: true
      },
      noBuildTree: false,
      emptyTip: null,
      disabled: false,
      readonly: false,
      checkbox: false,
      suffixCheckbox: false,
      renderer: {
        default: null,
        isFunc: true
      },
      multiple: false,
      indent: '16px',
      accordion: false,
      draggable: false,
      appear: false,
      floorSelect: false,
      onAsyncLoad: {
        default: null,
        isFunc: true
      },
      cacheNode: false,
      rootId: null,
      keyConfig: () => ({}),
      noCascaded: false,
      filter: '',
      ignoreCase: false,
      nodeProps: null,
      linkLine: false,
      postCreate: {
        default: null,
        isFunc: true
      },
      virtual: false,
      nodeMinHeight: 28
    })

    const nh = useNameHelper('tree')
    const nodeMap = new Map<Key, TreeNodeProps>()
    const treeNodes = ref<TreeNodeProps[]>([])
    const flattedNodes = ref<TreeNodeProps[]>([])
    const dragging = ref(false)
    const indicatorShow = ref(false)
    const anyMatched = ref(false)
    const keyConfig = reactive({ ...defaultKeyConfig })

    const { isMounted } = useMounted()

    const scroll = ref<NativeScrollExposed>()
    const trap = ref<HTMLElement>()
    const indicator = ref<HTMLElement>()

    const wrapper = computed(() => scroll.value?.content)

    let visibleNodeEls: HTMLElement[] = []

    const defaultNodeProperties = {
      visible: true,
      selected: false,
      expanded: false,
      disabled: false,
      checked: false,
      loading: false,
      loaded: false,
      readonly: false,
      arrow: 'auto' as boolean | 'auto',
      // will follow checkbox prop of tree when not set (be null)
      checkbox: null! as boolean,
      selectDisabled: false,
      expandDisabled: false,
      checkDisabled: false
    }

    const boundAsyncLoad = computed(() => {
      return typeof props.onAsyncLoad === 'function'
    })
    const labelKey = computed(() => keyConfig.label)
    const linkLine = computed(() => {
      return props.linkLine === true ? 'dashed' : props.linkLine === 'none' ? false : props.linkLine
    })
    const style = computed(() => {
      return {
        [nh.cv('indent-width')]:
          typeof props.indent === 'number' ? `${props.indent}px` : props.indent,
        [nh.cv('link-line-type')]: linkLine.value || undefined
      }
    })
    const visibleNodes = computed(() => {
      return flatTree(treeNodes.value, {
        keyField: 'id',
        parentField: 'parent',
        childField: 'children',
        injectId: false,
        depthFirst: true,
        cascaded: true,
        filter: node => {
          const parentNode = getParentNode(node)

          return (
            node.visible &&
            (node.matched || node.childMatched || node.upperMatched) &&
            (!parentNode || parentNode.expanded)
          )
        }
      })
    })

    const {
      indexMap,
      heightTree,
      startIndex,
      scrollOffset,
      visibleItems: virtualNodes,
      listStyle,
      itemsStyle,
      handleScroll,
      handleResize,
      handleItemResize
    } = useVirtual({
      wrapper,
      items: visibleNodes,
      itemSize: toRef(props, 'nodeMinHeight'),
      itemFixed: false,
      idKey: 'id',
      bufferSize: 5,
      autoResize: false
    })

    const virtualIds = computed(() => new Set(virtualNodes.value.map(node => node.id)))

    function createDefaultFilter(value: string) {
      const pattern = props.ignoreCase ? String(value).toLocaleLowerCase() : value
      const defaultFilter: FilterFn = data => {
        const label = data[labelKey.value]

        return props.ignoreCase
          ? String(label).toLocaleLowerCase().includes(pattern)
          : String(label).includes(pattern)
      }

      return defaultFilter
    }

    provide(
      TREE_STATE,
      reactive({
        arrow: toRef(props, 'arrow'),
        checkbox: toRef(props, 'checkbox'),
        suffixCheckbox: toRef(props, 'suffixCheckbox'),
        noCascaded: toRef(props, 'noCascaded'),
        linkLine,
        virtual: toRef(props, 'virtual'),
        renderer: toRef(props, 'renderer'),
        dragging,
        boundAsyncLoad,
        indexMap,
        heightTree,
        startIndex,
        virtualIds,
        updateVisibleNodeEls,
        computeCheckedState,
        handleItemResize,
        handleNodeClick,
        handleNodeSelect,
        handleNodeCancel,
        handleNodeExpand,
        handleNodeReduce,
        handleAsyncLoad,
        handleNodeDragStart,
        handleNodeDragOver,
        handleNodeDrop,
        handleNodeDragEnd,
        handleHittingChange,
        handleNodeHitting,
        handleLabelClick
      })
    )
    provide(
      TREE_NODE_STATE,
      reactive({
        depth: -1,
        disabled: toRef(props, 'disabled'),
        readonly: toRef(props, 'readonly')
      })
    )

    watchEffect(() => {
      const nodes = flattedNodes.value

      if (!props.filter) {
        for (let i = 0, len = nodes.length; i < len; ++i) {
          const node = nodes[i]

          node.matched = true
          node.childMatched = false
          node.upperMatched = false
        }

        anyMatched.value = true
      } else {
        const filter =
          typeof props.filter === 'function' ? props.filter : createDefaultFilter(props.filter)

        anyMatched.value = false

        for (let i = 0, len = nodes.length; i < len; ++i) {
          const node = nodes[i]
          const parent = nodeMap.get(node.parent)

          node.matched = filter(node.data, node)
          node.childMatched = false
          node.upperMatched = !!parent && (parent.matched || parent.upperMatched)
          anyMatched.value = anyMatched.value || node.matched

          if (node.matched) {
            let upper = parent

            while (upper && !upper.childMatched) {
              upper.childMatched = true
              upper = nodeMap.get(upper.parent)
            }
          }
        }
      }
    })
    watchEffect(() => {
      Object.assign(keyConfig, props.keyConfig)
    })
    watch(
      [
        () => props.data,
        () => props.data.length,
        () => keyConfig.id,
        () => keyConfig.children,
        () => keyConfig.parent,
        () => props.rootId
      ],
      parseAndTransformData,
      { immediate: true }
    )
    watch(
      [treeNodes, () => props.rootId],
      () => {
        flattedNodes.value = flatTree(treeNodes.value, {
          keyField: 'id',
          parentField: 'parent',
          childField: 'children',
          rootId: props.rootId,
          injectId: false
        })
      },
      { immediate: true }
    )

    onMounted(updateVisibleNodeEls)

    function getTreeOptions() {
      return {
        keyField: keyConfig.id,
        childField: keyConfig.children,
        parentField: keyConfig.parent,
        rootId: props.rootId
      }
    }

    function updateVisibleNodeEls() {
      requestAnimationFrame(() => {
        if (wrapper.value) {
          visibleNodeEls = queryAll(`.${nh.be('node')}`, wrapper.value)
        }
      })
    }

    function parseAndTransformData() {
      const idKey = keyConfig.id
      const parentKey = keyConfig.parent
      const oldDataMap = new Map<Data, TreeNodeProps>()
      const oldIpMap = new Map<any, TreeNodeProps>()

      for (const node of nodeMap.values()) {
        oldDataMap.set(node.data, node)
        oldIpMap.set(node.data[idKey], node)
      }

      nodeMap.clear()

      const nodes: TreeNodeProps[] = []
      const data = props.noBuildTree ? flatTree(props.data, getTreeOptions()) : props.data

      for (let i = 0, len = data.length; i < len; ++i) {
        const item = data[i]
        const oldNode = oldDataMap.get(item) ?? oldIpMap.get(item[idKey])
        const node = props.cacheNode
          ? oldNode ?? createNodeItem(item)
          : createNodeItem(item, oldNode)

        node.parent = item[parentKey]
        node.data = item

        nodeMap.set(node.id, node)
        nodes.push(node)
      }

      treeNodes.value = transformTree(nodes, {
        keyField: 'id',
        parentField: 'parent',
        childField: 'children',
        rootId: props.rootId
      })

      if (!props.noCascaded) {
        const checkedNodes = flattedNodes.value.filter(item => item.checked)

        for (let i = 0, len = checkedNodes.length; i < len; ++i) {
          const item = checkedNodes[i]
          const parentKey = item.parent

          updateCheckedDown(item)

          if (parentKey && nodeMap.has(parentKey)) {
            const parent = nodeMap.get(parentKey)!

            if (!parent.checked) {
              updateCheckedUpward(item)
            }
          }
        }
      }

      isMounted.value && updateVisibleNodeEls()
    }

    function forceUpdateData() {
      const nodes = []
      const data = props.noBuildTree ? flatTree(props.data, getTreeOptions()) : props.data

      const {
        id: idKey,
        visible: visibleKey,
        selected: selectedKey,
        expanded: expandedKey,
        disabled: disabledKey,
        checked: checkedKey,
        loading: loadingKey,
        loaded: loadedKey,
        readonly: readonlyKey,
        arrow: arrowKey,
        checkbox: checkboxKey,
        selectDisabled: selectDisabledKey,
        expandDisabled: expandDisabledKey,
        checkDisabled: checkDisabledKey
      } = keyConfig

      for (let i = 0, len = data.length; i < len; ++i) {
        const item = data[i]
        const id = item[idKey] as Key

        let node: TreeNodeProps

        if (nodeMap.has(id)) {
          node = nodeMap.get(id)!

          const {
            [visibleKey]: visible = node.visible,
            [selectedKey]: selected = node.selected,
            [expandedKey]: expanded = node.expanded,
            [disabledKey]: disabled = node.disabled,
            [checkedKey]: checked = node.checked,
            [loadingKey]: loading = node.loading,
            [loadedKey]: loaded = node.loaded,
            [readonlyKey]: readonly = node.readonly,
            [arrowKey]: arrow = node.arrow,
            [checkboxKey]: checkbox = node.checkbox,
            [selectDisabledKey]: selectDisabled = node.selectDisabled,
            [expandDisabledKey]: expandDisabled = node.expandDisabled,
            [checkDisabledKey]: checkDisabled = node.checkDisabled
          } = item

          node.visible = visible
          node.selected = selected
          node.expanded = expanded
          node.disabled = disabled
          node.checked = checked
          node.loading = loading
          node.loaded = loaded
          node.readonly = readonly
          node.arrow = arrow
          node.checkbox = checkbox
          node.selectDisabled = selectDisabled
          node.expandDisabled = expandDisabled
          node.checkDisabled = checkDisabled
        } else {
          node = createNodeItem(item)
          nodeMap.set(id, node)
        }

        nodes.push(node)
      }

      treeNodes.value = transformTree(nodes, {
        keyField: 'id',
        parentField: 'parent',
        childField: 'children',
        rootId: props.rootId
      })

      isMounted.value && updateVisibleNodeEls()
    }

    function syncNodeStateIntoData() {
      flattedNodes.value.forEach(node => {
        if (!node.data) return

        const { data, visible, selected, expanded, disabled, checked, loading, readonly } = node

        data.visible = visible
        data.selected = selected
        data.expanded = expanded
        data.disabled = disabled
        data.checked = checked
        data.loading = loading
        data.readonly = readonly
      })

      isMounted.value && updateVisibleNodeEls()
    }

    function createNodeItem(data: Data, defaults = defaultNodeProperties): TreeNodeProps {
      const {
        id: idKey,
        parent: parentKey,
        visible: visibleKey,
        selected: selectedKey,
        expanded: expandedKey,
        disabled: disabledKey,
        checked: checkedKey,
        loading: loadingKey,
        loaded: loadedKey,
        readonly: readonlyKey,
        arrow: arrowKey,
        checkbox: checkboxKey,
        selectDisabled: selectDisabledKey,
        expandDisabled: expandDisabledKey,
        checkDisabled: checkDisabledKey
      } = keyConfig

      const {
        [visibleKey]: visible = defaults.visible,
        [selectedKey]: selected = defaults.selected,
        [expandedKey]: expanded = defaults.expanded,
        [disabledKey]: disabled = defaults.disabled,
        [checkedKey]: checked = defaults.checked,
        [loadingKey]: loading = defaults.loading,
        [loadedKey]: loaded = defaults.loaded,
        [readonlyKey]: readonly = defaults.readonly,
        [arrowKey]: arrow = defaults.arrow,
        [checkboxKey]: checkbox = defaults.checkbox,
        [selectDisabledKey]: selectDisabled = defaults.selectDisabled,
        [expandDisabledKey]: expandDisabled = defaults.expandDisabled,
        [checkDisabledKey]: checkDisabled = defaults.checkDisabled
      } = data
      const id = data[idKey]
      const parent = data[parentKey]

      const node = {
        id,
        parent,
        data,
        visible,
        selected,
        expanded,
        disabled,
        checked,
        loading,
        loaded,
        readonly,
        arrow,
        checkbox,
        selectDisabled,
        expandDisabled,
        checkDisabled
      } as TreeNodeProps

      if (typeof props.postCreate === 'function') {
        props.postCreate(node)
      }

      return reactive({
        ...node,
        id,
        parent,
        children: [],
        partial: false,
        matched: false,
        childMatched: false,
        upperMatched: false
      })
    }

    function getNodeChildren(node: TreeNodeProps) {
      return node.children
    }

    function updateCheckedUpward(originNode: TreeNodeProps) {
      let node = originNode

      while (!isNull(node.parent)) {
        const parentId = node.parent

        if (!nodeMap.has(parentId)) break

        const parent = nodeMap.get(parentId)!

        if (node.checked === parent.checked && node.partial === parent.partial) {
          break
        }

        if (node.checked) {
          parent.checked = parent.children.every(item => item.checked)
          parent.partial = !parent.checked
        } else {
          parent.checked = false
          parent.partial = parent.children.some(item => item.checked || item.partial)
        }

        node = parent
      }
    }

    function updateCheckedDown(originNode: TreeNodeProps) {
      const checked = originNode.checked
      const partial = originNode.partial

      const loop = [...(originNode.children as TreeNodeProps[])]

      let node

      while (loop.length) {
        node = loop.shift()!

        if (node.disabled) continue

        node.checked = checked
        node.partial = partial

        if (node.children.length) {
          loop.push(...(node.children as TreeNodeProps[]))
        }
      }
    }

    function computeCheckedState(originNode: TreeNodeProps, able: boolean) {
      if (!props.noCascaded) {
        const nodeList = [originNode].concat(
          // 需要包含被禁用且被勾选的节点
          flattedNodes.value.filter(item => (item.disabled || item.checkDisabled) && item.checked)
        )

        for (let i = 0, len = nodeList.length; i < len; ++i) {
          const item = nodeList[i]

          updateCheckedUpward(item)
          updateCheckedDown(item)
        }
      }

      emitEvent(props.onNodeChange, originNode.data, originNode, able)
    }

    function handleNodeClick(node: TreeNodeProps) {
      emitEvent(props.onNodeClick, node.data, node)
    }

    function handleLabelClick(node: TreeNodeProps) {
      emitEvent(props.onLabelClick, node.data, node)
    }

    function handleNodeSelect(node: TreeNodeProps) {
      const selectedNodes = flattedNodes.value.filter(item => item.selected)

      if (props.multiple) {
        emitEvent(
          props.onNodeSelect,
          selectedNodes.map(item => item.data),
          selectedNodes
        )
      } else {
        const currentId = node.id

        for (let i = 0, len = selectedNodes.length; i < len; ++i) {
          const item = selectedNodes[i]

          item.selected = item.id === currentId
        }

        emitEvent(props.onNodeSelect, node.data, node)
      }
    }

    function handleNodeCancel(node: TreeNodeProps) {
      emitEvent(props.onNodeCancel, node.data, node)
    }

    function handleNodeExpand(node: TreeNodeProps) {
      if (props.accordion) {
        const siblingNodes = getSiblingNodes(node)

        for (let i = 0, len = siblingNodes.length; i < len; ++i) {
          siblingNodes[i].expanded = false
        }
      }

      emitEvent(props.onNodeExpand, node.data, node)
    }

    function handleNodeReduce(node: TreeNodeProps) {
      emitEvent(props.onNodeReduce, node.data, node)
    }

    async function handleAsyncLoad(node: TreeNodeProps) {
      if (!boundAsyncLoad.value) return false

      let result = props.onAsyncLoad(node.data, node)

      if (isPromise(result)) {
        result = await result
      }

      return result !== false
    }

    let dragState: {
      draggingNode: TreeNodeProps,
      treeRect: DOMRect,
      willDropNode: TreeNodeProps | null,
      dropType: DropType
    } | null = null

    function handleNodeDragStart(nodeInstance: TreeNodeInstance) {
      if (!wrapper.value) return

      dragState = {
        draggingNode: nodeInstance.node,
        treeRect: wrapper.value.getBoundingClientRect(),
        willDropNode: null,
        dropType: DropType.BEFORE
      }

      dragging.value = true
      emitEvent(props.onDragStart, nodeInstance.node.data, nodeInstance.node)
    }

    function handleNodeDragOver(nodeInstance: TreeNodeInstance, event: DragEvent) {
      if (!dragState || !nodeInstance.el || !nodeInstance.arrow) return

      const dropNodeRect = nodeInstance.el.getBoundingClientRect()
      const treeRect = dragState.treeRect
      const dropArrowRect = nodeInstance.arrow.getBoundingClientRect()
      const prevPercent = 0.25
      const nextPercent = 0.75
      const distance = event.clientY - dropNodeRect.top
      const dropNodeHeight = dropArrowRect.height

      let dropType: DropType
      let indicatorTop = -9999
      let isIndicatorShow = true

      if (distance < dropNodeHeight * prevPercent) {
        dropType = DropType.BEFORE
        indicatorTop = dropArrowRect.top - treeRect.top
      } else if (distance > dropNodeHeight * nextPercent) {
        dropType = DropType.AFTER
        indicatorTop = dropArrowRect.bottom - treeRect.top
      } else {
        dropType = DropType.INNER
        isIndicatorShow = false
      }

      if (indicator.value) {
        indicator.value.style.top = `${indicatorTop}px`
        indicator.value.style.left = `${dropArrowRect.right - treeRect.left}px`
      }

      dragState.willDropNode = nodeInstance.node
      dragState.dropType = dropType

      indicatorShow.value = isIndicatorShow
      emitEvent(props.onDragOver, nodeInstance.node.data, nodeInstance.node)
    }

    function isLeftInsideRight(left: TreeNodeProps, right: TreeNodeProps) {
      if (!left || !right) return true

      while (left) {
        if (left === right || left.id === right.id) {
          return true
        }

        left = getParentNode(left)!
      }

      return false
    }

    function handleNodeDrop(nodeInstance: TreeNodeInstance) {
      if (!dragState) return

      const { draggingNode, willDropNode, dropType } = dragState

      if (!willDropNode || isLeftInsideRight(willDropNode, draggingNode)) return

      let currentId: Key
      let parent: TreeNodeProps | null

      if (draggingNode) {
        parent = getParentNode(draggingNode)

        if (!parent) {
          parent = {
            children: treeNodes.value
          } as TreeNodeProps
        }

        currentId = draggingNode.id as Key
        removeArrayItem(parent.children, item => item.id === currentId)
      }

      if (dropType === DropType.INNER) {
        if (!Array.isArray(willDropNode.children)) {
          willDropNode.children = []
        }

        const children = Array.from(willDropNode.children as TreeNodeProps[])

        children.push(draggingNode)

        willDropNode.children = children
        draggingNode.parent = willDropNode.id
      } else {
        parent = getParentNode(willDropNode)

        if (!parent) {
          parent = {
            parent: undefined! as Key,
            children: treeNodes.value
          } as TreeNodeProps
        }

        currentId = willDropNode.id
        const index = parent.children.findIndex(item => item.id === currentId)

        if (~index) {
          parent.children.splice(+(dropType === DropType.AFTER) + index, 0, draggingNode)

          draggingNode.parent = parent.id
        }
      }

      emitEvent(props.onDrop, nodeInstance.node.data, nodeInstance.node, dropType)
    }

    function handleNodeDragEnd(nodeInstance: TreeNodeInstance) {
      dragging.value = true
      indicatorShow.value = false
      dragState = null
      emitEvent(props.onDragEnd, nodeInstance.node.data, nodeInstance.node)
    }

    function handleHittingChange(type: 'up' | 'down') {
      const activeEl = document.activeElement

      if (!visibleNodeEls.length || !activeEl) return

      const index = visibleNodeEls.findIndex(nodeEl => nodeEl === activeEl)

      if (~index) {
        visibleNodeEls.at((index + (type === 'up' ? -1 : 1)) % visibleNodeEls.length)?.focus()
      }
    }

    function handleNodeHitting(nodeEl?: HTMLElement | null) {
      if (!nodeEl || !visibleNodeEls.length) return

      if (visibleNodeEls.includes(nodeEl)) {
        nodeEl.focus()
      }
    }

    function handleTreeFocus(event: FocusEvent) {
      const target = event.target as HTMLElement

      if (!visibleNodeEls.length || !target || !trap.value) {
        return
      }

      if (target === trap.value) {
        visibleNodeEls[0].focus()
      }
    }

    function refreshScroll() {
      scroll.value?.refresh()
    }

    function getCheckedNodes(): TreeNodeProps[] {
      return flattedNodes.value.filter(item => item.checked)
    }

    function getCheckedNodeData() {
      return getCheckedNodes().map(node => node.data)
    }

    function getSelectedNodes(): TreeNodeProps[] {
      return flattedNodes.value.filter(item => item.selected)
    }

    function getSelectedNodeData() {
      return getSelectedNodes().map(node => node.data)
    }

    function getExpandedNodes(): TreeNodeProps[] {
      return flattedNodes.value.filter(item => item.expanded)
    }

    function getDisabledNodes(): TreeNodeProps[] {
      return flattedNodes.value.filter(item => item.disabled)
    }

    function getParentNode(node: TreeNodeProps): TreeNodeProps | null {
      if (node.parent) {
        return nodeMap.get(node.parent) ?? null
      }

      return null
    }

    function getSiblingNodes(node: TreeNodeProps, includeSelf = false): TreeNodeProps[] {
      const parent = getParentNode(node)

      const currentId = node.id as Key
      const parentId = parent ? (parent.id as Key) : null

      return flattedNodes.value.filter(item => {
        const isChild = parentId === null ? !item.parent : item.parent === parentId

        if (isChild && !includeSelf) {
          return item.id !== currentId
        }

        return isChild
      })
    }

    function getPrevSiblingNode(node: TreeNodeProps): TreeNodeProps | null {
      const parent = getParentNode(node)

      if (!parent) return null

      const currentId = node.id
      const parentId = parent.id
      const children = flattedNodes.value.filter(item => item.parent === parentId)

      if (children && children.length) {
        const index = children.findIndex(item => item.id === currentId)

        if (index > 0) {
          return children[index - 1]
        }
      }

      return null
    }

    function getNextSiblingNode(node: TreeNodeProps): TreeNodeProps | null {
      const parent = getParentNode(node)

      if (!parent) return null

      const currentId = node.id
      const parentId = parent.id
      const children = flattedNodes.value.filter(item => item.parent === parentId)

      if (children && children.length) {
        const index = children.findIndex(item => item.id === currentId)

        if (!~index && index < children.length - 1) {
          return children[index + 1]
        }
      }

      return null
    }

    function getNodeByData<T extends Data>(data: T): TreeNodeProps | null {
      const idKey = keyConfig.id

      return flattedNodes.value.find(item => item.data[idKey] === data[idKey]) ?? null
    }

    function expandNodeByData<T extends Data>(data: T, expanded?: boolean, upstream = false) {
      const node = getNodeByData(data)

      if (node) {
        node.expanded = isNull(expanded) ? !node.expanded : !!expanded

        if (upstream) {
          let parentNode = getParentNode(node)

          while (parentNode) {
            parentNode.expanded = node.expanded
            parentNode = getParentNode(parentNode)
          }
        }
      }
    }

    function selectNodeByData<T extends Data>(data: T, selected?: boolean) {
      const node = getNodeByData(data)

      if (node) {
        node.selected = isNull(selected) ? !node.selected : !!selected
      }
    }

    function checkNodeByData<T extends Data>(data: T, checked?: boolean) {
      const node = getNodeByData(data)

      if (node) {
        node.checked = isNull(checked) ? !node.checked : !!checked

        if (!props.noCascaded) {
          const nodeList = [node].concat(
            flattedNodes.value.filter(item => item.disabled && item.checked)
          )

          for (let i = 0, len = nodeList.length; i < len; ++i) {
            const item = nodeList[i]

            updateCheckedUpward(item)
            updateCheckedDown(item)
          }
        }
      }
    }

    function toggleNodeLoadingByData<T extends Data>(data: T, loading?: boolean) {
      const node = getNodeByData(data)

      if (node) {
        node.checked = isNull(loading) ? !node.loading : !!loading
      }
    }

    return {
      props,
      nh,
      locale: useLocale('tree', toRef(props, 'locale')),
      treeNodes,
      indicatorShow,
      anyMatched,
      labelKey,
      style,
      childrenKey: computed(() => keyConfig.children),
      getNodeProps: computed(() => {
        return typeof props.nodeProps === 'function' ? props.nodeProps : () => props.nodeProps
      }),
      visibleNodes,
      scrollOffset,
      virtualNodes,
      virtualIds,
      listStyle,
      itemsStyle,

      scroll,
      trap,
      indicator,

      handleScroll,
      handleResize,
      handleTreeFocus,
      refreshScroll,

      // api
      parseAndTransformData,
      forceUpdateData,
      syncNodeStateIntoData,
      getCheckedNodes,
      getCheckedNodeData,
      getSelectedNodes,
      getSelectedNodeData,
      getExpandedNodes,
      getDisabledNodes,
      getNodeChildren,
      getParentNode,
      getSiblingNodes,
      getPrevSiblingNode,
      getNextSiblingNode,
      getNodeByData,
      expandNodeByData,
      selectNodeByData,
      checkNodeByData,
      toggleNodeLoadingByData
    }
  }
})
</script>
