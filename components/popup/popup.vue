<template>
  <div :class="prefix">
    <PopupItem
      v-for="item in items"
      :key="item.key"
      ref="instances"
      :state="item"
      :transition-name="transitionName"
      :inner-class="innerClass"
      :style="getItemStyle(item)"
    >
      <template #default="{ item: itemData }">
        <slot name="item" :item="itemData"></slot>
      </template>
    </PopupItem>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, provide } from 'vue'
import PopupItem from './popup-item.vue'
import { isFunction, noop } from '@vexip-ui/utils'
import { DELETE_HANDLER } from './symbol'

import type { PropType, CSSProperties } from 'vue'
import type { Key, ClassType, PopupPlacement, PopupItemState } from './symbol'

const popupPlacements = Object.freeze<PopupPlacement>([
  'top-right',
  'top-center',
  'top-left',
  'bottom-right',
  'bottom-center',
  'bottom-left'
])

type QueneState =
  | {
      type: 'add',
      param: Record<string, unknown>
    }
  | {
      type: 'clear',
      param: Key
    }

let globalIndex = 0

export default defineComponent({
  name: 'Popup',
  components: {
    PopupItem
  },
  props: {
    zIndex: {
      type: Number,
      default: 2000,
      validator: (value: number) => value > 0
    },
    transitionName: {
      type: String,
      default: 'vxp-popup-top'
    },
    innerClass: {
      type: [String, Object] as PropType<ClassType>,
      default: null
    },
    startOffset: {
      type: Number,
      default: 30
    },
    placement: {
      default: 'top-right' as PopupPlacement,
      validator: (value: PopupPlacement) => popupPlacements.includes(value)
    },
    itemOffset: {
      type: Number,
      default: 16
    }
  },
  setup(props) {
    const prefix = 'vxp-popup'
    const items = ref<PopupItemState[]>([])
    const queue: QueneState[] = []

    const wrapper = ref<HTMLElement | null>(null)

    let pending = false

    const placementArray = computed(() => {
      return props.placement.split('-') as ['top' | 'bottom', 'right' | 'center' | 'left']
    })

    provide(DELETE_HANDLER, deleteItem)

    watch(
      () => props.startOffset,
      (value, prevValue) => {
        items.value.forEach(item => {
          item.verticalPosition += value - prevValue
        })
      }
    )

    function getItemStyle(item: PopupItemState) {
      const [verticalStyle, horizontalStyle] = placementArray.value
      const style: CSSProperties = { [verticalStyle]: `${item.verticalPosition}px` }

      if (horizontalStyle === 'center') {
        style.left = '50%'
        style.transform = 'translateX(-50%)'
      } else {
        style[horizontalStyle] = '24px'
      }

      return style
    }

    function add(options: Record<string, unknown>) {
      return new Promise<Key>(resolve => {
        const onOpen = isFunction(options.onOpen) ? options.onOpen : noop

        options.onOpen = (key: Key) => {
          resolve(key)
          onOpen()
        }

        queue.push({
          type: 'add',
          param: options
        })

        if (!pending) {
          queueOut()
          pending = true
        }
      })
    }

    function remove(key: Key) {
      return new Promise<boolean>(resolve => {
        const item = find(key)

        if (!item) return resolve(false)

        const onClose = isFunction(item.onClose) ? item.onClose : noop

        item.onClose = (reslut: boolean) => {
          resolve(reslut)
          onClose(reslut)
        }

        queue.push({
          type: 'clear',
          param: key
        })

        if (!pending) {
          queueOut()
          pending = true
        }
      })
    }

    function queueOut() {
      if (queue.length) {
        const state = queue.shift()!

        if (state.type === 'add') {
          renderItem(state.param)
        } else {
          removeItem(state.param)
        }

        // this.$nextTick(() => {
        //   this.queueOut()
        // })

        requestAnimationFrame(() => {
          queueOut()
        })
      } else {
        pending = false
      }
    }

    function renderItem(options: Record<string, unknown>) {
      let item = options.key ? find(options.key as Key) : null

      if (!item?.visible) {
        const index = getIndex()
        const key = (options.key as Key) ?? `${prefix}-${index}`

        let currentVertical = props.startOffset

        items.value.forEach(existingItem => {
          if (existingItem.visible) {
            currentVertical += existingItem.height + props.itemOffset
          }
        })

        item = Object.assign(
          {
            key,
            content: '',
            closable: false,
            onOpen: noop,
            onClose: noop
          },
          options,
          {
            zIndex: index,
            height: 0,
            visible: true,
            verticalPosition: currentVertical
          }
        )

        items.value.push(item)
      }

      // 使用 options 上的回调以防止重复 key 时指向不正确
      isFunction(options.onOpen) && options.onOpen(item.key)
    }

    function removeItem(key: Key) {
      const index = items.value.findIndex(item => item.key === key)

      if (~index) {
        const item = items.value[index]
        const removeHeight = item.height

        item.visible = false

        for (let i = index + 1, len = items.value.length; i < len; ++i) {
          items.value[i].verticalPosition -= removeHeight + props.itemOffset
        }

        // 关闭回调
        isFunction(item.onClose) && item.onClose(true)
      }
    }

    function deleteItem(key: Key) {
      const index = items.value.findIndex(item => item.key === key)

      if (~index) {
        items.value.splice(index, 1)
      }
    }

    function has(key: Key) {
      return !~items.value.findIndex(item => item.key === key)
    }

    function find(key: Key) {
      return items.value.find(item => item.key === key)
    }

    function clear() {
      queue.length = 0
      items.value = []
    }

    function getIndex() {
      return props.zIndex + globalIndex++
    }

    return {
      prefix,
      items,

      wrapper,

      getItemStyle,

      add,
      remove,
      has,
      find,
      clear
    }
  }
})
</script>
