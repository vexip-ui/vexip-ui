<script setup lang="ts">
import { Checkbox } from '@/components/checkbox'
import { Icon } from '@/components/icon'
import { Option } from '@/components/option'
import { VirtualList } from '@/components/virtual-list'

import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { useIcons, useNameHelper } from '@vexip-ui/config'
import { useModifier, useRtl } from '@vexip-ui/hooks'
import { boundRange, decide } from '@vexip-ui/utils'

import type { PropType } from 'vue'
import type { VirtualListExposed } from '@/components/virtual-list'
import type { CascaderOptionState, CascaderPanelSlots } from './symbol'

defineOptions({ name: 'CascaderPanel' })

const props = defineProps({
  options: {
    type: Array as PropType<CascaderOptionState[]>,
    default: () => []
  },
  openedId: {
    type: Number,
    default: null
  },
  values: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  ready: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  },
  checkIcon: {
    type: Object,
    default: null
  },
  isAsync: {
    type: Boolean,
    default: false
  },
  merged: {
    type: Boolean,
    default: false
  },
  noCascaded: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: false
  },
  labeledBy: {
    type: String,
    default: undefined
  }
})

const emit = defineEmits(['select', 'check', 'hover', 'open', 'back', 'close'])

defineSlots<CascaderPanelSlots>()

const nh = useNameHelper('cascader')
const icons = useIcons()
const { isRtl } = useRtl()
const currentHitting = ref(-1)

const list = ref<VirtualListExposed>()

const { target: wrapper } = useModifier({
  passive: false,
  onKeyDown: (event, modifier) => {
    if (modifier.escape) {
      emit('close')
      return
    }

    decide(
      [
        [
          () => modifier.up || modifier.down,
          () => {
            if (currentHitting.value < 0) {
              currentHitting.value = props.options.findIndex(isSelected)

              if (currentHitting.value < 0) {
                currentHitting.value = 0
              }

              return
            }

            currentHitting.value = boundRange(
              findEnabledIndex(currentHitting.value + (modifier.up ? -1 : 1), modifier.up ? -1 : 1),
              0,
              props.options.length - 1
            )
            ensureOptionInView(currentHitting.value, modifier.up ? 'top' : 'bottom')
          }
        ],
        [
          () => modifier.left || modifier.right,
          () => {
            if (modifier.right) {
              const option = props.options[currentHitting.value]

              if (option && hasChildren(option)) {
                emit('open', option)
              }
            } else {
              emit('back')
            }
          }
        ],
        [
          () => modifier.enter || modifier.space,
          () => {
            event.stopPropagation()

            const option = props.options[currentHitting.value]

            if (option) {
              if (props.multiple) {
                handleToggleCheck(option)
              } else {
                handleSelect(option, currentHitting.value)
              }
            }
          }
        ]
      ],
      {
        beforeMatchAny: () => event.preventDefault(),
        afterMatchAny: modifier.resetAll
      }
    )
  }
})

let listHeight = 0
let hoverTimer: ReturnType<typeof setTimeout>

watch([() => props.ready, () => props.options], () => {
  requestAnimationFrame(computeListHeight)

  if (props.ready) {
    list.value?.refresh()
    currentHitting.value = props.options.findIndex(isSelected)
  } else {
    currentHitting.value = -1
  }
})

onMounted(() => {
  requestAnimationFrame(computeListHeight)
})

onBeforeUnmount(handleMouseLeave)

defineExpose({ currentHitting })

function hasChildren(option: CascaderOptionState) {
  return !!(option.hasChild || option.children?.length)
}

function isSelected(option: CascaderOptionState) {
  return (
    (hasChildren(option) && option.id === props.openedId) || props.values.includes(option.fullValue)
  )
}

function isCheckboxDisabled(option: CascaderOptionState) {
  return (
    option.disabled ||
    (!props.merged &&
      props.multiple &&
      props.isAsync &&
      hasChildren(option) &&
      !option.childrenLoaded)
  )
}

function handleSelect(option: CascaderOptionState, index: number) {
  if (option.disabled) return

  currentHitting.value = index

  if (props.multiple || props.noCascaded) {
    hasChildren(option) ? emit('select', option) : handleToggleCheck(option)
  } else {
    emit('select', option)
  }
}

function handleToggleCheck(option: CascaderOptionState) {
  !isCheckboxDisabled(option) && emit('check', option)
}

function handleMouseEnter(option: CascaderOptionState) {
  clearTimeout(hoverTimer)

  hoverTimer = setTimeout(() => {
    !option.disabled && emit('hover', option)
  }, 100)
}

function handleMouseLeave() {
  clearTimeout(hoverTimer)
}

function computeListHeight() {
  const el = list.value?.wrapper

  if (el) {
    const style = getComputedStyle(el)
    const paddingTop = parseInt(style.paddingTop)
    const paddingBottom = parseInt(style.paddingBottom)

    listHeight = el.offsetHeight - paddingTop - paddingBottom
  }
}

function queryEnabledIndex(index: number, step: number) {
  const options = props.options
  step = step / Math.abs(step)

  while (options[index]?.disabled) {
    index += step

    if (index < 0 || index >= options.length) break
  }

  return index
}

function findEnabledIndex(index: number, sign: 1 | -1 = 1) {
  const options = props.options

  if (options[index]?.disabled) {
    index = queryEnabledIndex(index, sign)

    if (sign > 0 ? index >= options.length : index < 0) {
      index = queryEnabledIndex(index, -sign)

      // 全禁用
      if (sign > 0 ? index < 0 : index >= options.length) index = -1
    }
  }

  return index
}

function ensureOptionInView(index: number, direction: 'top' | 'bottom') {
  const option = props.options[index]
  const optionHeight = 32

  if (!option || !list.value) return

  if (direction === 'bottom') {
    const target = (index + 1) * optionHeight

    if (list.value.scrollOffset + listHeight < target) {
      list.value.scrollTo(target - listHeight)
    }
  } else {
    const target = index * optionHeight

    if (list.value.scrollOffset > target) {
      list.value.scrollTo(target)
    }
  }
}
</script>

<template>
  <div
    ref="wrapper"
    :class="nh.be('panel')"
    tabindex="-1"
    :aria-labelledby="labeledBy"
    @mouseleave="handleMouseLeave"
  >
    <VirtualList
      ref="list"
      inherit
      :items="options"
      :item-size="32"
      height="100%"
      id-key="id"
      :items-attrs="{
        class: [
          nh.be('options'),
          multiple ? nh.bem('options', 'multiple') : null,
          noCascaded ? nh.bem('options', 'no-cascaded') : null
        ],
        role: 'listbox',
        ariaMultiselectable: multiple
      }"
      @resize="computeListHeight"
    >
      <template #default="{ item, index }">
        <Option
          :class="{
            [nh.ns('option--error')]: item.error
          }"
          :value="item.value"
          :label="item.label"
          :disabled="item.disabled"
          :selected="isSelected(item)"
          :hitting="index === currentHitting"
          @select="handleSelect(item, index)"
          @mouseenter="handleMouseEnter(item)"
        >
          <slot
            :option="item"
            :index="index"
            :selected="isSelected(item)"
            :can-check="isCheckboxDisabled(item)"
            :has-child="hasChildren(item)"
          >
            <Checkbox
              v-if="multiple || noCascaded"
              inherit
              :class="nh.be('checkbox')"
              :checked="item.checked"
              :control="hasChildren(item)"
              :partial="item.partial"
              :disabled="isCheckboxDisabled(item)"
              size="small"
              @click.prevent.stop="handleToggleCheck(item)"
            ></Checkbox>
            <span :class="nh.be('label')">
              <slot
                name="label"
                :option="item"
                :index="index"
                :selected="isSelected(item)"
                :can-check="isCheckboxDisabled(item)"
                :has-child="hasChildren(item)"
                :handle-select="() => handleSelect(item, index)"
              >
                {{ item.label }}
              </slot>
            </span>
            <div :class="nh.be('icon')">
              <Icon v-if="item.loading" v-bind="icons.loading"></Icon>
              <Icon v-else-if="item.error" v-bind="icons.refresh"></Icon>
              <template v-else-if="hasChildren(item)">
                <Icon v-if="isRtl" v-bind="icons.angleLeft"></Icon>
                <Icon v-else v-bind="icons.angleRight"></Icon>
              </template>
              <Icon
                v-else-if="!multiple && !noCascaded && checkIcon && values.includes(item.fullValue)"
                v-bind="icons.check"
                :icon="checkIcon || icons.check.icon"
              ></Icon>
            </div>
          </slot>
        </Option>
      </template>
    </VirtualList>
  </div>
</template>
