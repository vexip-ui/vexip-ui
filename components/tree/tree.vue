<template>
  <div
    ref="wrapper"
    :class="[nh.b(), nh.bs('vars')]"
    :aria-disabled="props.disabled"
    :aria-readonly="props.readonly"
  >
    <ul :class="nh.be('list')">
      <TreeNode
        v-for="(item, index) in treeData"
        v-show="item.visible"
        :key="index"
        v-bind="(item as any)"
        :node="item"
        :label-key="labelKey"
        :indent="props.indent"
        :draggable="props.draggable"
        :appear="props.appear"
        :floor-select="props.floorSelect"
      >
        <template #default="{ data: nodeDta, node, depth, children, toggleCheck, toggleExpand, toggleSelect }">
          <slot
            name="node"
            :data="nodeDta"
            :node="node"
            :depth="depth"
            :children="children"
            :toggle-check="toggleCheck"
            :toggle-expand="toggleExpand"
            :toggle-select="toggleSelect"
          ></slot>
        </template>
        <template #label="{ data: nodeData, node, children }">
          <slot
            name="label"
            :data="nodeData"
            :node="node"
            :children="children"
          ></slot>
        </template>
      </TreeNode>
    </ul>
    <div v-if="!props.data || !props.data.length" :class="nh.be('empty-tip')">
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
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, provide, nextTick, toRef } from 'vue'
import TreeNode from './tree-node.vue'
import { useNameHelper, useProps, useLocale, booleanProp } from '@vexip-ui/config'
import { isNull, isPromise, transformTree, flatTree, removeArrayItem } from '@vexip-ui/utils'
import { DropType, TREE_STATE, TREE_NODE_STATE } from './symbol'

import type { PropType } from 'vue'
import type {
  Key,
  Data,
  NodeKeyConfig,
  TreeNodeProps,
  RenderFn,
  AsyncLoadFn,
  TreeNodeInstance
} from './symbol'

const defaultKeyConfig: Required<NodeKeyConfig> = {
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
  checkbox: 'checkbox'
}

export default defineComponent({
  name: 'Tree',
  components: {
    TreeNode
  },
  props: {
    arrow: {
      type: [Boolean, String] as PropType<boolean | 'auto'>,
      default: null
    },
    data: Array as PropType<Data[]>,
    noBuildTree: booleanProp,
    emptyTip: String,
    disabled: booleanProp,
    readonly: booleanProp,
    checkbox: booleanProp,
    suffixCheckbox: booleanProp,
    renderer: Function as PropType<RenderFn>,
    multiple: booleanProp,
    indent: [String, Number],
    accordion: booleanProp,
    draggable: booleanProp,
    appear: booleanProp,
    floorSelect: booleanProp,
    onAsyncLoad: Function as PropType<AsyncLoadFn>,
    cacheNode: booleanProp,
    rootId: [String, Number],
    keyConfig: Object as PropType<NodeKeyConfig>,
    noCascaded: booleanProp
  },
  emits: [
    'node-change',
    'node-click',
    'node-select',
    'node-cancel',
    'node-expand',
    'node-reduce',
    'node-shrink',
    'drag-start',
    'drag-over',
    'drop',
    'drag-end'
  ],
  setup(_props, { emit }) {
    const props = useProps('tree', _props, {
      arrow: {
        default: 'auto',
        validator: (value: boolean | 'auto') => typeof value === 'boolean' || value === 'auto'
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
      noCascaded: false
    })

    const nh = useNameHelper('tree')
    const nodeMaps = new Map<Key, TreeNodeProps>()
    const flatData = ref<TreeNodeProps[]>([])
    const treeData = ref<TreeNodeProps[]>([])
    const dragging = ref(false)
    const indicatorShow = ref(false)

    const wrapper = ref<HTMLElement | null>(null)
    const indicator = ref<HTMLElement | null>(null)

    const keyConfig = computed(() => {
      return { ...defaultKeyConfig, ...props.keyConfig }
    })
    const parsedOptions = computed(() => {
      return {
        keyField: keyConfig.value.id,
        childField: keyConfig.value.children,
        parentField: keyConfig.value.parent,
        rootId: props.rootId
      }
    })
    const boundAsyncLoad = computed(() => {
      return typeof props.onAsyncLoad === 'function'
    })

    provide(
      TREE_STATE,
      reactive({
        arrow: toRef(props, 'arrow'),
        checkbox: toRef(props, 'checkbox'),
        suffixCheckbox: toRef(props, 'suffixCheckbox'),
        renderer: toRef(props, 'renderer'),
        dragging,
        boundAsyncLoad,
        computeCheckedState,
        handleNodeClick,
        handleNodeSelect,
        handleNodeCancel,
        handleNodeExpand,
        handleNodeReduce,
        handleAsyncLoad,
        handleNodeDragStart,
        handleNodeDragOver,
        handleNodeDrop,
        handleNodeDragEnd
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

    watch([() => props.data, () => props.data.length], parseAndTransformData)
    watch(parsedOptions, parseAndTransformData)

    // created
    parseAndTransformData()

    const checkedNodes = flatData.value.filter(item => item.checked)

    for (let i = 0, len = checkedNodes.length; i < len; ++i) {
      const item = checkedNodes[i]
      const parentKey = item.parent

      updateCheckedDown(item)

      if (parentKey && nodeMaps.has(parentKey)) {
        const parent = nodeMaps.get(parentKey)!

        if (!parent.checked) {
          updateCheckedUpward(item)
        }
      }
    }

    function parseAndTransformData() {
      const idKey = keyConfig.value.id
      const parentKey = keyConfig.value.parent
      const oldDataMap = new Map<Data, TreeNodeProps>()
      const oldIpMap = new Map<any, TreeNodeProps>()

      for (const node of nodeMaps.values()) {
        oldDataMap.set(node.data, node)
        oldIpMap.set(node.data[idKey], node)
      }

      nodeMaps.clear()

      const newFlatData: TreeNodeProps[] = []
      const data = props.noBuildTree ? flatTree(props.data, parsedOptions.value) : props.data

      for (let i = 0, len = data.length; i < len; ++i) {
        const item = data[i]
        const node = props.cacheNode
          ? oldDataMap.get(item) ?? oldIpMap.get(item[idKey]) ?? createNodeItem(item)
          : createNodeItem(item)

        node.parent = item[parentKey]
        node.data = item

        nodeMaps.set(node.id, node)
        newFlatData.push(node)
      }

      treeData.value = transformTree(newFlatData, {
        keyField: 'id',
        parentField: 'parent',
        childField: 'children',
        rootId: props.rootId
      })
      flatData.value = newFlatData
    }

    function forceUpdateData() {
      const _flatData = []
      const data = props.noBuildTree ? flatTree(props.data, parsedOptions.value) : props.data

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
        checkbox: checkboxKey
      } = keyConfig.value

      for (let i = 0, len = data.length; i < len; ++i) {
        const item = data[i]
        const id = item[idKey] as Key

        let node: TreeNodeProps

        if (nodeMaps.has(id)) {
          const {
            [visibleKey]: visible = true,
            [selectedKey]: selected = false,
            [expandedKey]: expanded = false,
            [disabledKey]: disabled = false,
            [checkedKey]: checked = false,
            [loadingKey]: loading = false,
            [loadedKey]: loaded = false,
            [readonlyKey]: readonly = false,
            [arrowKey]: arrow = 'auto',
            [checkboxKey]: checkbox = null
          } = item

          node = nodeMaps.get(id)!
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
        } else {
          node = createNodeItem(item)
          nodeMaps.set(id, node)
        }

        _flatData.push(node)
      }

      treeData.value = transformTree(_flatData, {
        keyField: 'id',
        parentField: 'parent',
        childField: 'children',
        rootId: props.rootId
      })
      flatData.value = _flatData
    }

    function syncNodeStateIntoData() {
      flatData.value.forEach(node => {
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
    }

    function createNodeItem(data: Data): TreeNodeProps {
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
        checkbox: checkboxKey
      } = keyConfig.value

      const {
        [visibleKey]: visible = true,
        [selectedKey]: selected = false,
        [expandedKey]: expanded = false,
        [disabledKey]: disabled = false,
        [checkedKey]: checked = false,
        [loadingKey]: loading = false,
        [loadedKey]: loaded = false,
        [readonlyKey]: readonly = false,
        [arrowKey]: arrow = 'auto',
        [checkboxKey]: checkbox = null
      } = data
      const id = data[idKey]
      const parent = data[parentKey]

      return reactive({
        id,
        parent,
        children: [],
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
        partial: false
      })
    }

    function getNodeChildren(node: TreeNodeProps) {
      return node.children
    }

    function updateCheckedUpward(originNode: TreeNodeProps) {
      let node = originNode

      while (!isNull(node.parent)) {
        const parentId = node.parent

        if (!nodeMaps.has(parentId)) break

        const parent = nodeMaps.get(parentId)!

        if (node.checked === parent.checked && node.partial === parent.partial) {
          break
        }

        if (node.checked) {
          parent.checked = parent.children.every(item => item.checked)
          parent.partial = !parent.checked
        } else {
          parent.checked = false
          parent.partial = parent.children.some(
            item => item.checked || item.partial
          )
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
          flatData.value.filter(item => item.disabled && item.checked)
        )

        for (let i = 0, len = nodeList.length; i < len; ++i) {
          const item = nodeList[i]

          updateCheckedUpward(item)
          updateCheckedDown(item)
        }
      }

      emit('node-change', originNode.data, originNode, able)
    }

    function handleNodeClick(node: TreeNodeProps) {
      emit('node-click', node.data, node)
    }

    function handleNodeSelect(node: TreeNodeProps) {
      const selectedNodes = flatData.value.filter(item => item.selected)

      if (props.multiple) {
        emit(
          'node-select',
          selectedNodes.map(item => item.data),
          selectedNodes
        )
      } else {
        const currentId = node.id

        for (let i = 0, len = selectedNodes.length; i < len; ++i) {
          const item = selectedNodes[i]

          item.selected = item.id === currentId
        }

        emit('node-select', node.data, node)
      }
    }

    function handleNodeCancel(node: TreeNodeProps) {
      emit('node-cancel', node.data, node)
    }

    function handleNodeExpand(node: TreeNodeProps) {
      if (props.accordion) {
        const siblingNodes = getSiblingNodes(node)

        for (let i = 0, len = siblingNodes.length; i < len; ++i) {
          siblingNodes[i].expanded = false
        }
      }

      emit('node-expand', node.data, node)
    }

    function handleNodeReduce(node: TreeNodeProps) {
      emit('node-reduce', node.data, node)
    }

    async function handleAsyncLoad(node: TreeNodeProps) {
      if (!boundAsyncLoad.value) return false

      let result = props.onAsyncLoad(node)

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
      emit('drag-start', nodeInstance.node.data, nodeInstance.node)
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
      emit('drag-over', nodeInstance.node.data, nodeInstance.node)
    }

    function handleNodeDrop(nodeInstance: TreeNodeInstance) {
      if (!dragState) return

      const { draggingNode, willDropNode, dropType } = dragState

      if (!willDropNode || draggingNode.id === willDropNode.id) return

      let currentId: Key
      let parent: TreeNodeProps | null
      // let index: number

      if (draggingNode) {
        parent = getParentNode(draggingNode)

        if (!parent) {
          parent = {
            children: treeData.value
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
            children: treeData.value
          } as TreeNodeProps
        }

        currentId = willDropNode.id
        const index = parent.children.findIndex(item => item.id === currentId)

        if (~index) {
          parent.children.splice(
            +(dropType === DropType.AFTER) + index,
            0,
            draggingNode
          )

          draggingNode.parent = parent.id
        }
      }

      nextTick(() => {
        flatData.value = flatTree(treeData.value, {
          keyField: 'id',
          parentField: 'parent',
          childField: 'children',
          rootId: props.rootId
        })
      })

      emit('drop', nodeInstance.node.data, nodeInstance.node, dropType)
    }

    function handleNodeDragEnd(nodeInstance: TreeNodeInstance) {
      dragging.value = true
      indicatorShow.value = false
      dragState = null
      emit('drag-end', nodeInstance.node.data, nodeInstance.node)
    }

    function getCheckedNodes(): TreeNodeProps[] {
      return flatData.value.filter(item => item.checked)
    }

    function getCheckedNodeData() {
      return getCheckedNodes().map(node => node.data)
    }

    function getSelectedNodes(): TreeNodeProps[] {
      return flatData.value.filter(item => item.selected)
    }

    function getSelectedNodeData() {
      return getSelectedNodes().map(node => node.data)
    }

    function getExpandedNodes(): TreeNodeProps[] {
      return flatData.value.filter(item => item.expanded)
    }

    function getDisabledNodes(): TreeNodeProps[] {
      return flatData.value.filter(item => item.disabled)
    }

    function getParentNode(node: TreeNodeProps): TreeNodeProps | null {
      if (node.parent) {
        return nodeMaps.get(node.parent) ?? null
      }

      return null
    }

    function getSiblingNodes(node: TreeNodeProps, includeSelf = false): TreeNodeProps[] {
      const parent = getParentNode(node)

      const currentId = node.id as Key
      const parentId = parent ? parent.id as Key : null

      return flatData.value.filter(item => {
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
      const children = flatData.value.filter(item => item.parent === parentId)

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
      const children = flatData.value.filter(item => item.parent === parentId)

      if (children && children.length) {
        const index = children.findIndex(item => item.id === currentId)

        if (!~index && index < children.length - 1) {
          return children[index + 1]
        }
      }

      return null
    }

    function getNodeByData<T extends Data>(data: T): TreeNodeProps | null {
      const idKey = keyConfig.value.id

      return flatData.value.find(item => item.data[idKey] === data[idKey]) ?? null
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
            flatData.value.filter(item => item.disabled && item.checked)
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
      locale: useLocale('tree'),
      treeData,
      indicatorShow,
      labelKey: computed(() => keyConfig.value.label),
      childrenKey: computed(() => keyConfig.value.children),

      wrapper,
      indicator,

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
