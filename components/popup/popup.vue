<script setup lang="ts">
import { computed, provide, reactive, ref, watch } from 'vue'

import PopupItem from './popup-item.vue'
import { classProp, useNameHelper } from '@vexip-ui/config'
import { isFunction, noop } from '@vexip-ui/utils'
import { DELETE_HANDLER, getIndex, popupPlacements } from './symbol'

import type { CSSProperties } from 'vue'
import type { Key, PopupItemState, PopupPlacement } from './symbol'

type QueueState =
  | {
    type: 'add',
    param: Record<string, unknown>
  }
  | {
    type: 'clear',
    param: Key
  }

defineOptions({ name: 'Popup' })

const props = defineProps({
  transitionName: {
    type: String,
    default: null
  },
  innerClass: {
    type: classProp,
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
  },
  itemType: {
    type: Function
  }
})

defineSlots<{ item: (item: any) => any }>()

const nh = useNameHelper('popup')
const items = ref<PopupItemState[]>([])
const queue: QueueState[] = []

const wrapper = ref<HTMLElement>()

let pending = false

const placementArray = computed(() => {
  return props.placement.split('-') as ['top' | 'bottom', 'right' | 'center' | 'left']
})
const transition = computed(() => props.transitionName || nh.ns('popup-top'))

watch(
  () => props.startOffset,
  (value, prevValue) => {
    items.value.forEach(item => {
      item.verticalPosition += value - prevValue
    })
  }
)

provide(DELETE_HANDLER, deleteItem)

defineExpose({
  items,
  wrapper,
  add,
  remove,
  has,
  find,
  clear
})

function getItemStyle(item: PopupItemState) {
  const [verticalStyle, horizontalStyle] = placementArray.value
  const style: CSSProperties = { [verticalStyle]: `${item.verticalPosition}px` }

  if (horizontalStyle === 'center') {
    style.left = '50%'
    style.transform = 'translateX(-50%)'
  } else {
    style[horizontalStyle] = '24px'
  }

  const zIndex = parseInt(item.zIndex as string)

  if (!Number.isNaN(zIndex)) {
    style.zIndex = zIndex
  }

  return style
}

function add(options: Record<string, any>) {
  return new Promise<void>(resolve => {
    const onOpen = isFunction(options.onOpen) ? options.onOpen : noop

    options.onOpen = () => {
      resolve()
      onOpen()
    }

    queue.push({
      type: 'add',
      param: options
    })

    if (!pending) {
      pending = true
      queueOut()
    }
  })
}

function remove(key: Key) {
  return new Promise<boolean>(resolve => {
    const item = find(key)

    if (!item) return resolve(false)

    const onClose = isFunction(item.onClose) ? item.onClose : noop

    item.onClose = (result: boolean) => {
      resolve(result)
      onClose(result)
    }

    queue.push({
      type: 'clear',
      param: key
    })

    if (!pending) {
      pending = true
      queueOut()
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

    requestAnimationFrame(queueOut)
  } else {
    pending = false
  }
}

function renderItem(options: Record<string, any>) {
  let item = options.key ? find(options.key as Key) : null

  if (!item?.visible) {
    const index = getIndex()
    const key = (options.key as Key) ?? nh.bs(`${index}`)

    let currentVertical = props.startOffset

    items.value.forEach(existingItem => {
      if (existingItem.visible) {
        currentVertical += existingItem.height + props.itemOffset
      }
    })

    item = reactive(
      Object.assign(
        {
          key,
          content: '',
          closable: false,
          onOpen: noop,
          onClose: noop,
          onEnter: noop,
          onLeave: noop
        },
        options,
        {
          height: 0,
          visible: true,
          verticalPosition: currentVertical
        }
      )
    )

    items.value.push(item)
  }

  // 使用 options 上的回调以防止重复 key 时指向不正确
  isFunction(options.onOpen) && options.onOpen()
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

function enterItem(item: PopupItemState) {
  isFunction(item.onEnter) && item.onEnter()
}

function leaveItem(item: PopupItemState) {
  isFunction(item.onLeave) && item.onLeave()
}
</script>

<template>
  <div :class="[nh.b(), nh.bm(placement)]">
    <PopupItem
      v-for="item in items"
      :key="item.key"
      :state="item"
      :transition-name="transition"
      :inner-class="innerClass"
      :style="getItemStyle(item)"
      @enter="enterItem(item)"
      @leave="leaveItem(item)"
    >
      <template #default="{ item: itemData }">
        <slot name="item" :item="itemData"></slot>
      </template>
    </PopupItem>
  </div>
</template>
