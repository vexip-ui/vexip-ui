<template>
  <div
    ref="wrapper"
    :class="nh.be('panel')"
    tabindex="-1"
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
        role: 'listbox'
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
              <Icon v-if="item.loading" pulse>
                <Spinner></Spinner>
              </Icon>
              <Icon v-else-if="item.error">
                <ArrowsRotate></ArrowsRotate>
              </Icon>
              <Icon v-else-if="hasChildren(item)">
                <ChevronRight></ChevronRight>
              </Icon>
              <Icon
                v-else-if="!multiple && !noCascaded && checkIcon && values.includes(item.fullValue)"
                :icon="checkIcon"
              ></Icon>
            </div>
          </slot>
        </Option>
      </template>
    </VirtualList>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Checkbox } from '@/components/checkbox'
import { Icon } from '@/components/icon'
import { Option } from '@/components/option'
import { VirtualList } from '@/components/virtual-list'
import { ChevronRight, Check, Spinner, ArrowsRotate } from '@vexip-ui/icons'
import { useNameHelper } from '@vexip-ui/config'
import { useModifier } from '@vexip-ui/hooks'
import { boundRange } from '@vexip-ui/utils'

import type { PropType } from 'vue'
import type { VirtualListExposed } from '@/components/virtual-list'
import type { CascaderOptionState } from './symbol'

export default defineComponent({
  name: 'CascaderPanel',
  components: {
    Checkbox,
    Icon,
    Option,
    VirtualList,
    ChevronRight,
    Spinner,
    ArrowsRotate
  },
  props: {
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
      default: Check
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
    }
  },
  emits: ['select', 'check', 'hover', 'open', 'back', 'close'],
  setup(props, { emit }) {
    const nh = useNameHelper('cascader')
    const currentHitting = ref(-1)

    const list = ref<VirtualListExposed>()

    const { target: wrapper } = useModifier({
      passive: false,
      onKeyDown: (event, modifier) => {
        if (modifier.up || modifier.down) {
          event.preventDefault()

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
        } else if (modifier.left || modifier.right) {
          event.preventDefault()

          if (modifier.right) {
            const option = props.options[currentHitting.value]

            if (option && hasChildren(option)) {
              emit('open', option)
            }
          } else {
            emit('back')
          }
        } else if (modifier.enter || modifier.space) {
          event.preventDefault()
          event.stopPropagation()

          const option = props.options[currentHitting.value]

          if (option) {
            if (props.multiple) {
              handleToggleCheck(option)
            } else {
              handleSelect(option, currentHitting.value)
            }
          }
        } else if (modifier.escape) {
          emit('close')
        }
      }
    })

    let listHeight = 0
    let hoverTimer: ReturnType<typeof setTimeout>

    watch(
      () => props.ready,
      value => {
        requestAnimationFrame(computeListHeight)

        if (value) {
          list.value?.refresh()
          currentHitting.value = props.options.findIndex(isSelected)
        } else {
          currentHitting.value = -1
        }
      }
    )

    onMounted(() => {
      requestAnimationFrame(computeListHeight)
    })
    onBeforeUnmount(handleMouseLeave)

    function hasChildren(option: CascaderOptionState) {
      return !!(option.hasChild || option.children?.length)
    }

    function isSelected(option: CascaderOptionState) {
      return (
        (hasChildren(option) && option.id === props.openedId) ||
        props.values.includes(option.fullValue)
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
      }, 250)
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

    return {
      nh,
      currentHitting,

      wrapper,
      list,

      hasChildren,
      isSelected,
      isCheckboxDisabled,
      handleSelect,
      handleToggleCheck,
      handleMouseEnter,
      handleMouseLeave,
      computeListHeight
    }
  }
})
</script>
