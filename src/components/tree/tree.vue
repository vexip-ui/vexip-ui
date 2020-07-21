<template>
  <div :class="prefix">
    <Input
      v-if="search"
      v-model="searchValue"
      suffix="search"
      :debounce="true"
    ></Input>
    <ul :class="`${prefix}__list`">
      <TreeNode
        v-for="(item, index) in treeData"
        v-show="item.visible"
        :key="index"
        v-bind="item"
        :node="item"
        :label-key="labelKey"
        :children-key="childrenKey"
        :children="item[childrenKey]"
        :indent="indent"
        :draggable="draggable"
        :appear="appear"
        :floor-select="floorSelect"
      >
        <template #default="node">
          <slot name="node" v-bind="node"></slot>
        </template>
      </TreeNode>
    </ul>
    <div v-if="!data || !data.length" :class="`${prefix}__empty-tip`">
      <slot name="empty">
        {{ emptyTip }}
      </slot>
    </div>
    <div
      v-show="indicatorShow"
      ref="indicator"
      :class="`${prefix}__indicator`"
    ></div>
  </div>
</template>

<script>
import Input from '../input'
import TreeNode from './tree-node'
import { isNull, getType, transformTree, flatTree } from '../../utils/common'

import 'vue-awesome/icons/search'

const { prefix } = require('../../style/basis/variable')

// drop type
const BEFORE = 1
const INNER = 2
const AFTER = 3

export default {
  name: 'Tree',
  components: {
    Input,
    TreeNode
  },
  props: {
    arrow: {
      default: 'auto',
      validator(value) {
        return typeof value === 'boolean' || value === 'auto'
      }
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    buildTree: {
      type: Boolean,
      default: true
    },
    emptyTip: {
      type: String,
      default: '暂无数据'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checkbox: {
      type: Boolean,
      default: false
    },
    renderer: {
      type: Function,
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
    search: {
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
    }
  },
  data() {
    return {
      prefix: `${prefix}-tree`,
      nodeMaps: {},
      flatData: [],
      treeData: [],
      dragState: {},
      indicatorShow: false,
      searchValue: null
    }
  },
  computed: {
    bindAsyncLoad() {
      return !!(
        this._events['on-async-load'] && this._events['on-async-load'].length
      )
    },
    parseOptions() {
      const { idKey, childrenKey, parentKey } = this

      return {
        keyField: idKey,
        childField: childrenKey,
        parentField: parentKey
      }
    }
  },
  watch: {
    data(value, old) {
      if (value === old) {
        this.updateData()
      } else {
        this.parseAndTransformData()
      }
    },
    searchValue() {
      this.updateData()
    }
  },
  created() {
    this.parseAndTransformData()

    const { nodeMaps, parentKey } = this
    const checkedNodes = this.flatData.filter(item => item.checked)

    for (let i = 0, len = checkedNodes.length; i < len; i++) {
      const item = checkedNodes[i]

      this.updateCheckedDown(item)

      if (item[parentKey] && nodeMaps[item[parentKey]]) {
        const parent = nodeMaps[item[parentKey]]

        if (!parent.checked) {
          this.updateCheckedUpward(item)
        }
      }
    }
  },
  mounted() {
    if (
      this._events['on-node-shrink'] &&
      this._events['on-node-shrink'].length
    ) {
      console.error(
        "[Vexip warn] Event 'on-node-shrink' will be deprecated in the near future, replace it with 'on-node-reduce'"
      )
    }
  },
  methods: {
    parseAndTransformData() {
      const { idKey, buildTree, parseOptions, searchValue } = this
      const nodeMaps = {}
      const flatData = []

      let data = this.data || []

      data = buildTree ? data : flatTree(data, parseOptions)

      if (searchValue) {
        data = this.getFilterData(data)
      }

      for (let i = 0, len = data.length; i < len; i++) {
        const node = this.createNodeItem(data[i])

        nodeMaps[node[idKey]] = node
        flatData.push(node)
      }

      this.nodeMaps = nodeMaps
      this.flatData = flatData
      this.treeData = transformTree(flatData, parseOptions)
    },
    updateData() {
      const { idKey, buildTree, parseOptions, searchValue } = this
      const flatData = []
      const nodeMaps = this.nodeMaps

      let data = this.data || []

      data = buildTree ? data : flatTree(data, parseOptions)

      if (searchValue) {
        data = this.getFilterData(data)
      }

      for (let i = 0, len = data.length; i < len; i++) {
        const item = data[i]
        const id = item[idKey]

        let node

        if (nodeMaps[id]) {
          const { visible = true, disabled = false } = item

          node = nodeMaps[id]
          node.visible = visible
          node.disabled = disabled
        } else {
          node = this.createNodeItem(item)
          nodeMaps[id] = node
        }

        flatData.push(node)
      }

      this.flatData = flatData
      this.treeData = transformTree(flatData, parseOptions)
    },
    getFilterData(data) {
      const { searchValue, labelKey } = this

      return data.filter(
        item => item[labelKey] && item[labelKey].includes(searchValue)
      )
    },
    createNodeItem(data) {
      const { idKey, parentKey } = this
      const {
        visible = true,
        selected = false,
        expanded = false,
        disabled = false,
        checked = false
      } = data
      const id = data[idKey]
      const parent = data[parentKey]

      return {
        data,
        visible,
        selected,
        expanded,
        disabled,
        checked,
        [idKey]: id,
        [parentKey]: parent
      }
    },
    updateCheckedUpward(originNode) {
      const { parentKey, childrenKey, nodeMaps } = this

      let node = originNode

      while (!isNull(node[parentKey])) {
        const parentId = node[parentKey]

        if (!nodeMaps[parentId]) break

        const parent = nodeMaps[parentId]

        if (
          node.checked === parent.checked &&
          node.partial === parent.partial
        ) {
          break
        }

        if (node.checked) {
          this.$set(
            parent,
            'checked',
            parent[childrenKey].every(item => item.checked)
          )
          this.$set(parent, 'partial', !parent.checked)
        } else {
          this.$set(parent, 'checked', false)
          this.$set(
            parent,
            'partial',
            parent[childrenKey].some(item => item.checked || item.partial)
          )
        }

        node = parent
      }
    },
    updateCheckedDown(originNode) {
      const childrenKey = this.childrenKey
      const checked = originNode.checked
      const partial = originNode.partial

      let node
      const loop = [...originNode[childrenKey]]

      while (loop.length) {
        node = loop.shift()

        if (node.disabled) continue

        this.$set(node, 'checked', checked)
        this.$set(node, 'partial', partial)

        if (node[childrenKey] && node[childrenKey].length) {
          loop.push(...node[childrenKey])
        }
      }
    },
    computeCheckedState(originNode, able) {
      const nodeList = [originNode].concat(
        this.flatData.filter(item => item.disabled)
      )

      for (let i = 0, len = nodeList.length; i < len; i++) {
        const item = nodeList[i]

        this.updateCheckedUpward(item)
        this.updateCheckedDown(item)
      }

      this.$emit('on-node-change', originNode.data, originNode, able)
    },
    handleNodeClick(node) {
      this.$emit('on-node-click', node.data, node)
    },
    handleNodeSelect(node) {
      const selectedNodes = this.flatData.filter(item => item.selected)

      if (this.multiple) {
        this.$emit(
          'on-node-select',
          selectedNodes.map(item => item.data),
          selectedNodes
        )
      } else {
        const idKey = this.idKey
        const currentId = node[idKey]

        for (let i = 0, len = selectedNodes.length; i < len; i++) {
          const item = selectedNodes[i]

          this.$set(item, 'selected', item[idKey] === currentId)
        }

        this.$emit('on-node-select', node.data, node)
      }
    },
    handleNodeCancel(node) {
      this.$emit('on-node-cancel', node.data, node)
    },
    handleNodeExpand(node) {
      if (this.accordion) {
        const siblingNodes = this.getSiblingNodes(node)

        for (let i = 0, len = siblingNodes.length; i < len; i++) {
          this.$set(siblingNodes[i], 'expanded', false)
        }
      }

      this.$emit('on-node-expand', node.data, node)
    },
    handleNodeReduce(node) {
      this.$emit('on-node-reduce', node.data, node)
      // TODO: will be deprecated
      this.$emit('on-node-shrink', node.data, node)
    },
    handleAsyncLoad(node, callback) {
      this.$emit('on-async-load', node.data, node, callback)
    },
    getCheckedNodes() {
      return this.flatData.filter(item => item.checked)
    },
    getCheckedNodeData() {
      return this.getCheckedNodes().map(node => node.data)
    },
    getSelectedNodes() {
      return this.flatData.filter(item => item.selected)
    },
    getSelectedNodeData() {
      return this.getSelectedNodes().map(node => node.data)
    },
    getExpandedNodes() {
      return this.flatData.filter(item => item.expanded)
    },
    getDisabledNodes() {
      return this.flatData.filter(item => item.disabled)
    },
    getParentNode(node) {
      const { parentKey, nodeMaps } = this

      if (node[parentKey]) {
        return nodeMaps[node[parentKey]] || null
      }

      return null
    },
    getSiblingNodes(node, includeSelf = false) {
      const { idKey, parentKey, flatData, getParentNode } = this
      const parent = getParentNode(node)

      const currentId = node[idKey]
      const parentId = parent ? parent[idKey] : null

      return flatData.filter(item => {
        const isChild =
          parentId === null ? !item[parentKey] : item[parentKey] === parentId

        if (isChild && !includeSelf) {
          return item[idKey] !== currentId
        }

        return isChild
      })
    },
    getPrevSiblingNode(node) {
      const { idKey, parentKey, flatData, getParentNode } = this
      const parent = getParentNode(node)

      if (!parent) return null

      const currentId = node[idKey]
      const parentId = parent[idKey]
      const children = flatData.filter(item => item[parentKey] === parentId)

      if (children && children.length) {
        const index = children.findIndex(item => item[idKey] === currentId)

        if (index > 0) {
          return children[index - 1].data
        }
      }

      return null
    },
    getNextSiblingNode(node) {
      const { idKey, parentKey, flatData, getParentNode } = this
      const parent = getParentNode(node)

      if (!parent) return null

      const currentId = node[idKey]
      const parentId = parent[idKey]
      const children = flatData.filter(item => item[parentKey] === parentId)

      if (children && children.length) {
        const index = children.findIndex(item => item[idKey] === currentId)

        if (!~index && index < children.length - 1) {
          return children[index + 1].data
        }
      }

      return null
    },
    handleNodeDragStart(nodeInstance) {
      this.dragState.draggingNode = nodeInstance.node
      this.$emit('on-drag-start', nodeInstance.data, nodeInstance.node)
    },
    handleNodeDragOver(nodeInstance) {
      const dragState = this.dragState
      const indicator = this.$refs.indicator
      const dropNodeRect = nodeInstance.$el.getBoundingClientRect()
      const treeRect = this.$el.getBoundingClientRect()
      const dropArrowRect = nodeInstance.$refs.arrow.getBoundingClientRect()
      const prevPercent = 0.25
      const nextPercent = 0.75
      const distance = event.clientY - dropNodeRect.top
      const dropNodeHeight = dropNodeRect.height

      let dropType
      let indicatorTop = -9999
      let indicatorShow = true

      if (distance < dropNodeHeight * prevPercent) {
        dropType = BEFORE
        indicatorTop = dropArrowRect.top - treeRect.top
      } else if (distance > dropNodeHeight * nextPercent) {
        dropType = AFTER
        indicatorTop = dropArrowRect.bottom - treeRect.top
      } else {
        dropType = INNER
        indicatorShow = false
      }

      indicator.style.top = `${indicatorTop}px`
      indicator.style.left = `${dropArrowRect.right - treeRect.left}px`

      dragState.willDropNode = nodeInstance.node
      dragState.dropType = dropType

      this.indicatorShow = indicatorShow
      this.$emit('on-drag-over', nodeInstance.data, nodeInstance.node)
    },
    handleNodeDrop(nodeInstance) {
      const { dragState, idKey, parentKey, childrenKey } = this
      const { draggingNode, willDropNode, dropType } = dragState

      if (draggingNode[idKey] === willDropNode[idKey]) return

      let currentId, parent, index

      if (draggingNode) {
        parent = this.getParentNode(draggingNode)

        if (parent) {
          currentId = draggingNode[idKey]
          index = parent[childrenKey].findIndex(
            item => item[idKey] === currentId
          )

          if (~index) {
            parent[childrenKey].splice(index, 1)
          }
        }
      }

      if (dropType === INNER) {
        if (getType(willDropNode[childrenKey]) !== 'array') {
          this.$set(willDropNode, childrenKey, [])
        }

        const children = Array.from(willDropNode[childrenKey])

        children.push(draggingNode)

        this.$set(willDropNode, childrenKey, children)
        this.$set(draggingNode, parentKey, willDropNode[idKey])
      } else {
        parent = this.getParentNode(willDropNode)

        if (parent) {
          currentId = willDropNode[idKey]
          index = parent[childrenKey].findIndex(
            item => item[idKey] === currentId
          )

          if (~index) {
            parent[childrenKey].splice(
              index + (dropType === AFTER),
              0,
              draggingNode
            )

            this.$set(draggingNode, parentKey, parent[idKey])
          }
        }
      }

      this.$nextTick(() => {
        this.flatData = flatTree(this.treeData, this.parseOptions)
        this.$forceUpdate()
      })

      this.$emit('on-drop', nodeInstance.data, nodeInstance.node)
    },
    handleNodeDragEnd(nodeInstance) {
      this.indicatorShow = false
      this.dragState = {}
      this.$emit('on-drag-end', nodeInstance.data)
    },
    getNodeByData(data) {
      return this.flatData.find(item => item.data === data)
    },
    expandNodeByData(data, expanded) {
      const node = this.getNodeByData(data)

      if (node) {
        node.expanded = isNull(expanded) ? !node.expanded : expanded
      }
    },
    selectNodeByData(data, selected) {
      const node = this.getNodeByData(data)

      if (node) {
        node.selected = isNull(selected) ? !node.selected : selected
      }
    },
    checkNodeByData(data, checked) {
      const node = this.getNodeByData(data)

      if (node) {
        node.checked = isNull(checked) ? !node.checked : checked
      }
    }
  }
}
</script>
