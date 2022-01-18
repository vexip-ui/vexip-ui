<template>
  <div
    ref="wrapper"
    :class="prefix"
    :aria-disabled="disabled"
    :aria-readonly="readonly"
  >
    <ul :class="`${prefix}__list`">
      <TreeNode
        v-for="(item, index) in treeData"
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
        <template #default="node">
          <slot name="node" v-bind="node"></slot>
        </template>
        <template #label="data">
          <slot name="label" v-bind="data"></slot>
        </template>
      </TreeNode>
    </ul>
    <div v-if="!data || !data.length" :class="`${prefix}__empty-tip`">
      <slot name="empty">
        {{ emptyTip ?? locale.empty }}
      </slot>
    </div>
    <div
      v-if="draggable"
      v-show="indicatorShow"
      ref="indicator"
      :class="`${prefix}__indicator`"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, provide, nextTick, toRef } from 'vue'
import TreeNode from './tree-node.vue'
import { useConfiguredProps } from '@/common/config/install'
import { useLocaleConfig } from '@/common/config/locale'
import { isNull, isPromise } from '@/common/utils/common'
import { transformTree, flatTree } from '@/common/utils/transform'
import { TREE_STATE, TREE_NODE_STATE } from './symbol'

import '@/common/icons/chevron-right'
import '@/common/icons/spinner'

import type { PropType } from 'vue'
import type {
  Key,
  Data,
  InitDataOptions,
  TreeNodeOptions,
  RenderFn,
  AsyncLoadFn,
  TreeNodeInstance
} from './symbol'

export enum DropType {
  BEFORE,
  INNER,
  AFTER
}

const props = useConfiguredProps('tree', {
  arrow: {
    type: [Boolean, String] as PropType<boolean | 'auto'>,
    default: 'auto',
    validator: (value: boolean | 'auto') => {
      return typeof value === 'boolean' || value === 'auto'
    }
  },
  data: {
    type: Array as PropType<InitDataOptions[]>,
    default: () => []
  },
  noBuildTree: {
    type: Boolean,
    default: true
  },
  emptyTip: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  checkbox: {
    type: Boolean,
    default: false
  },
  renderer: {
    type: Function as PropType<RenderFn>,
    default: null
  },
  idKey: {
    type: String,
    default: 'id'
  },
  labelKey: {
    type: String,
    default: 'label'
  },
  childrenKey: {
    type: String,
    default: 'children'
  },
  parentKey: {
    type: String,
    default: 'parent'
  },
  multiple: {
    type: Boolean,
    default: false
  },
  indent: {
    type: [String, Number],
    default: '1.2em'
  },
  accordion: {
    type: Boolean,
    default: false
  },
  draggable: {
    type: Boolean,
    default: false
  },
  appear: {
    type: Boolean,
    default: false
  },
  floorSelect: {
    type: Boolean,
    default: false
  },
  asyncLoad: {
    type: Function as PropType<AsyncLoadFn>,
    default: null
  },
  cacheNode: {
    type: Boolean,
    default: false
  },
  rootId: {
    type: [String, Number],
    default: null
  }
})

export default defineComponent({
  name: 'Tree',
  components: {
    TreeNode
  },
  props,
  emits: [
    'on-node-change',
    'on-node-click',
    'on-node-select',
    'on-node-cancel',
    'on-node-expand',
    'on-node-reduce',
    'on-node-shrink',
    'on-drag-start',
    'on-drag-over',
    'on-drop',
    'on-drag-end'
  ],
  setup(props, { emit }) {
    const prefix = 'vxp-tree'
    const nodeMaps = new Map<Key, TreeNodeOptions>()
    const flatData = ref<TreeNodeOptions[]>([])
    const treeData = ref<TreeNodeOptions[]>([])
    const indicatorShow = ref(false)

    const wrapper = ref<HTMLElement | null>(null)
    const indicator = ref<HTMLElement | null>(null)

    const parsedOptions = computed(() => {
      return {
        keyField: props.idKey,
        childField: props.childrenKey,
        parentField: props.parentKey
      }
    })
    const boundAsyncLoad = computed(() => {
      return typeof props.asyncLoad === 'function'
    })

    provide(
      TREE_STATE,
      reactive({
        arrow: toRef(props, 'arrow'),
        checkbox: toRef(props, 'checkbox'),
        renderer: toRef(props, 'renderer'),
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
        disabled: toRef(props, 'disabled'),
        readonly: toRef(props, 'readonly')
      })
    )

    watch([() => props.data, () => props.data.length], parseAndTransformData)

    // created
    parseAndTransformData()

    const checkedNodes = flatData.value.filter(item => item.checked)

    for (let i = 0, len = checkedNodes.length; i < len; i++) {
      const item = checkedNodes[i]
      const parentKey = item[props.parentKey] as Key

      updateCheckedDown(item)

      if (parentKey && nodeMaps.has(parentKey)) {
        const parent = nodeMaps.get(parentKey)!

        if (!parent.checked) {
          updateCheckedUpward(item)
        }
      }
    }

    function parseAndTransformData() {
      const idKey = props.idKey
      const oldDataMap = new Map<Data, TreeNodeOptions>()
      const oldIpMap = new Map<any, TreeNodeOptions>()

      for (const node of nodeMaps.values()) {
        oldDataMap.set(node.data, node)
        oldIpMap.set(node.data[idKey], node)
      }

      nodeMaps.clear()

      const newFlatData = []
      const data = props.noBuildTree ? flatTree(props.data, parsedOptions.value) : props.data

      for (let i = 0, len = data.length; i < len; i++) {
        const item = data[i]
        const node = props.cacheNode
          ? oldDataMap.get(item) ?? oldIpMap.get(item[idKey]) ?? createNodeItem(item)
          : createNodeItem(item)

        node[props.parentKey] = item[props.parentKey]
        node.data = item

        nodeMaps.set(node[props.idKey] as Key, node)
        newFlatData.push(node)
      }

      treeData.value = transformTree(newFlatData, parsedOptions.value)
      flatData.value = newFlatData
    }

    function forceUpdateData() {
      const _flatData = []
      const data = props.noBuildTree ? flatTree(props.data, parsedOptions.value) : props.data

      for (let i = 0, len = data.length; i < len; i++) {
        const item = data[i]
        const id = item[props.idKey] as Key

        let node: TreeNodeOptions

        if (nodeMaps.has(id)) {
          const {
            visible = true,
            selected = false,
            expanded = false,
            disabled = false,
            checked = false,
            loading = false,
            readonly = false,
            arrow = 'auto',
            checkbox = null
          } = item

          node = nodeMaps.get(id)!
          node.visible = visible
          node.selected = selected
          node.expanded = expanded
          node.disabled = disabled
          node.checked = checked
          node.loading = loading
          node.readonly = readonly
          node.arrow = arrow
          node.checkbox = checkbox
        } else {
          node = createNodeItem(item)
          nodeMaps.set(id, node)
        }

        _flatData.push(node)
      }

      treeData.value = transformTree(_flatData, parsedOptions.value)
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

    function createNodeItem(data: InitDataOptions): TreeNodeOptions {
      const {
        visible = true,
        selected = false,
        expanded = false,
        disabled = false,
        checked = false,
        loading = false,
        loaded = false,
        readonly = false,
        arrow = 'auto',
        checkbox = null
      } = data
      const id = data[props.idKey]
      const parent = data[props.parentKey]

      return reactive({
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
        partial: false,
        [props.idKey]: id,
        [props.parentKey]: parent,
        [props.childrenKey]: []
      })
    }

    function getNodeChildren(node: TreeNodeOptions) {
      return node[props.childrenKey] as TreeNodeOptions[]
    }

    function updateCheckedUpward(originNode: TreeNodeOptions) {
      const { parentKey, childrenKey } = props

      let node = originNode

      while (!isNull(node[parentKey])) {
        const parentId = node[parentKey] as Key

        if (!nodeMaps.has(parentId)) break

        const parent = nodeMaps.get(parentId)!

        if (node.checked === parent.checked && node.partial === parent.partial) {
          break
        }

        if (node.checked) {
          parent.checked = (parent[childrenKey] as TreeNodeOptions[]).every(item => item.checked)
          parent.partial = !parent.checked
        } else {
          parent.checked = false
          parent.partial = (parent[childrenKey] as TreeNodeOptions[]).some(
            item => item.checked || item.partial
          )
        }

        node = parent
      }
    }

    function updateCheckedDown(originNode: TreeNodeOptions) {
      const childrenKey = props.childrenKey
      const checked = originNode.checked
      const partial = originNode.partial

      const loop = [...(originNode[childrenKey] as TreeNodeOptions[])]

      let node

      while (loop.length) {
        node = loop.shift()!

        if (node.disabled) continue

        node.checked = checked
        node.partial = partial

        if (node[childrenKey] && (node[childrenKey] as TreeNodeOptions[]).length) {
          loop.push(...(node[childrenKey] as TreeNodeOptions[]))
        }
      }
    }

    function computeCheckedState(originNode: TreeNodeOptions, able: boolean) {
      const nodeList = [originNode].concat(
        // 需要包含被禁用且被勾选的节点
        flatData.value.filter(item => item.disabled && item.checked)
      )

      for (let i = 0, len = nodeList.length; i < len; i++) {
        const item = nodeList[i]

        updateCheckedUpward(item)
        updateCheckedDown(item)
      }

      emit('on-node-change', originNode.data, originNode, able)
    }

    function handleNodeClick(node: TreeNodeOptions) {
      emit('on-node-click', node.data, node)
    }

    function handleNodeSelect(node: TreeNodeOptions) {
      const selectedNodes = flatData.value.filter(item => item.selected)

      if (props.multiple) {
        emit(
          'on-node-select',
          selectedNodes.map(item => item.data),
          selectedNodes
        )
      } else {
        const idKey = props.idKey
        const currentId = node[idKey] as Key

        for (let i = 0, len = selectedNodes.length; i < len; i++) {
          const item = selectedNodes[i]

          item.selected = item[idKey] === currentId
        }

        emit('on-node-select', node.data, node)
      }
    }

    function handleNodeCancel(node: TreeNodeOptions) {
      emit('on-node-cancel', node.data, node)
    }

    function handleNodeExpand(node: TreeNodeOptions) {
      if (props.accordion) {
        const siblingNodes = getSiblingNodes(node)

        for (let i = 0, len = siblingNodes.length; i < len; i++) {
          siblingNodes[i].expanded = false
        }
      }

      emit('on-node-expand', node.data, node)
    }

    function handleNodeReduce(node: TreeNodeOptions) {
      emit('on-node-reduce', node.data, node)
    }

    async function handleAsyncLoad(node: TreeNodeOptions) {
      if (!boundAsyncLoad.value) return false

      let result = props.asyncLoad(node)

      if (isPromise(result)) {
        result = await result
      }

      return result !== false
    }

    let dragState: {
      draggingNode: TreeNodeOptions,
      treeRect: DOMRect,
      willDropNode: TreeNodeOptions | null,
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

      emit('on-drag-start', nodeInstance.node.data, nodeInstance.node)
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
      emit('on-drag-over', nodeInstance.node.data, nodeInstance.node)
    }

    function handleNodeDrop(nodeInstance: TreeNodeInstance) {
      if (!dragState) return

      const { idKey, parentKey, childrenKey } = props
      const { draggingNode, willDropNode, dropType } = dragState

      if (!willDropNode || draggingNode[idKey] === willDropNode[idKey]) return

      let currentId: Key
      let parent: TreeNodeOptions | null
      let index: number

      if (draggingNode) {
        parent = getParentNode(draggingNode)

        if (!parent) {
          parent = {
            [childrenKey]: treeData.value
          } as TreeNodeOptions
        }

        currentId = draggingNode[idKey] as Key
        index = (parent[childrenKey] as TreeNodeOptions[]).findIndex(
          item => item[idKey] === currentId
        )

        if (~index) {
          (parent[childrenKey] as TreeNodeOptions[]).splice(index, 1)
        }
      }

      if (dropType === DropType.INNER) {
        if (!Array.isArray(willDropNode[childrenKey])) {
          willDropNode[childrenKey] = []
        }

        const children = Array.from(willDropNode[childrenKey] as TreeNodeOptions[])

        children.push(draggingNode)

        willDropNode[childrenKey] = children
        draggingNode[parentKey] = willDropNode[idKey]
      } else {
        parent = getParentNode(willDropNode)

        if (!parent) {
          parent = {
            [parentKey]: undefined,
            [childrenKey]: treeData.value
          } as TreeNodeOptions
        }

        currentId = willDropNode[idKey] as Key
        index = (parent[childrenKey] as TreeNodeOptions[]).findIndex(
          item => item[idKey] === currentId
        )

        if (~index) {
          (parent[childrenKey] as TreeNodeOptions[]).splice(
            +(dropType === DropType.AFTER) + index,
            0,
            draggingNode
          )

          draggingNode[parentKey] = parent[idKey]
        }
      }

      nextTick(() => {
        flatData.value = flatTree(treeData.value, parsedOptions.value)
      })

      emit('on-drop', nodeInstance.node.data, nodeInstance.node, dropType)
    }

    function handleNodeDragEnd(nodeInstance: TreeNodeInstance) {
      indicatorShow.value = false
      dragState = null
      emit('on-drag-end', nodeInstance.node.data)
    }

    function getCheckedNodes() {
      return flatData.value.filter(item => item.checked)
    }

    function getCheckedNodeData() {
      return getCheckedNodes().map(node => node.data)
    }

    function getSelectedNodes() {
      return flatData.value.filter(item => item.selected)
    }

    function getSelectedNodeData() {
      return getSelectedNodes().map(node => node.data)
    }

    function getExpandedNodes() {
      return flatData.value.filter(item => item.expanded)
    }

    function getDisabledNodes() {
      return flatData.value.filter(item => item.disabled)
    }

    function getParentNode(node: TreeNodeOptions) {
      if (node[props.parentKey]) {
        return nodeMaps.get(node[props.parentKey] as Key) ?? null
      }

      return null
    }

    function getSiblingNodes(node: TreeNodeOptions, includeSelf = false) {
      const { idKey, parentKey } = props
      const parent = getParentNode(node)

      const currentId = node[idKey] as Key
      const parentId = parent ? (parent[idKey] as Key) : null

      return flatData.value.filter(item => {
        const isChild = parentId === null ? !item[parentKey] : item[parentKey] === parentId

        if (isChild && !includeSelf) {
          return item[idKey] !== currentId
        }

        return isChild
      })
    }

    function getPrevSiblingNode(node: TreeNodeOptions) {
      const { idKey, parentKey } = props
      const parent = getParentNode(node)

      if (!parent) return null

      const currentId = node[idKey] as Key
      const parentId = parent[idKey] as Key
      const children = flatData.value.filter(item => item[parentKey] === parentId)

      if (children && children.length) {
        const index = children.findIndex(item => item[idKey] === currentId)

        if (index > 0) {
          return children[index - 1].data
        }
      }

      return null
    }

    function getNextSiblingNode(node: TreeNodeOptions) {
      const { idKey, parentKey } = props
      const parent = getParentNode(node)

      if (!parent) return null

      const currentId = node[idKey] as Key
      const parentId = parent[idKey] as Key
      const children = flatData.value.filter(item => item[parentKey] === parentId)

      if (children && children.length) {
        const index = children.findIndex(item => item[idKey] === currentId)

        if (!~index && index < children.length - 1) {
          return children[index + 1].data
        }
      }

      return null
    }

    function getNodeByData<T extends Data>(data: T) {
      const idKey = props.idKey

      return flatData.value.find(item => item.data[idKey] === data[idKey])
    }

    function expandNodeByData<T extends Data>(data: T, expanded: boolean) {
      const node = getNodeByData(data)

      if (node) {
        node.expanded = isNull(expanded) ? !node.expanded : !!expanded
      }
    }

    function selectNodeByData<T extends Data>(data: T, selected: boolean) {
      const node = getNodeByData(data)

      if (node) {
        node.selected = isNull(selected) ? !node.selected : !!selected
      }
    }

    function checkNodeByData<T extends Data>(data: T, checked: boolean) {
      const node = getNodeByData(data)

      if (node) {
        node.checked = isNull(checked) ? !node.checked : !!checked
      }
    }

    function toggleNodeLoadingByData<T extends Data>(data: T, loading: boolean) {
      const node = getNodeByData(data)

      if (node) {
        node.checked = isNull(loading) ? !node.loading : !!loading
      }
    }

    return {
      prefix,
      locale: useLocaleConfig('tree'),
      treeData,
      indicatorShow,

      wrapper,
      indicator,

      // api
      forceUpdateData,
      syncNodeStateIntoData,
      getNodeChildren,
      getCheckedNodes,
      getCheckedNodeData,
      getSelectedNodes,
      getSelectedNodeData,
      getExpandedNodes,
      getDisabledNodes,
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
