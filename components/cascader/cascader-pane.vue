<template>
  <div :class="nh.be('pane')" @mouseleave="handleMouseLeave">
    <VirtualList
      ref="virtualList"
      :items="options"
      :item-size="32"
      height="100%"
      id-key="id"
      :items-attrs="{
        class: [
          nh.be('options'),
          multiple ? nh.bem('options', 'multiple') : null,
          noCascaded ? nh.bem('options', 'no-cascaded') : null
        ]
      }"
    >
      <template #default="{ item, index }">
        <slot
          :option="item"
          :index="index"
          :selected="isSelected(item)"
          :can-check="isCheckboxDisabled(item)"
          :has-child="hasChildren(item)"
          :handle-select="handleSelect"
        >
          <Option
            :class="{
              'vxp-option--error': item.error
            }"
            :value="item.value"
            :label="item.label"
            :disabled="item.disabled"
            :selected="isSelected(item)"
            @select="handleSelect(item)"
            @mouseenter="handleMouseEnter(item)"
          >
            <Checkbox
              v-if="multiple || noCascaded"
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
                :handle-select="handleSelect"
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
          </Option>
        </slot>
      </template>
    </VirtualList>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeUnmount } from 'vue'
import { Checkbox } from '@/components/checkbox'
import { Icon } from '@/components/icon'
import { Option } from '@/components/option'
import { VirtualList } from '@/components/virtual-list'
import { ChevronRight, Check, Spinner, ArrowsRotate } from '@vexip-ui/icons'
import { useNameHelper } from '@vexip-ui/config'

import type { PropType } from 'vue'
import type { VirtualListExposed } from '@/components/virtual-list'
import type { OptionState } from './symbol'

export default defineComponent({
  name: 'CascaderPane',
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
      type: Array as PropType<OptionState[]>,
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
    }
  },
  emits: ['select', 'check', 'hover'],
  setup(props, { emit }) {
    const nh = useNameHelper('cascader')
    const virtualList = ref<InstanceType<typeof VirtualList> & VirtualListExposed | null>(null)

    let hoverTimer = 0

    watch(
      () => props.ready,
      value => {
        value && virtualList.value?.refresh()
      }
    )

    onBeforeUnmount(handleMouseLeave)

    function hasChildren(option: OptionState) {
      return !!(option.hasChild || option.children?.length)
    }

    function isSelected(option: OptionState) {
      return (hasChildren(option) && option.id === props.openedId) || props.values.includes(option.fullValue)
    }

    function isCheckboxDisabled(option: OptionState) {
      return (
        option.disabled ||
        (!props.merged &&
          props.multiple &&
          props.isAsync &&
          hasChildren(option) &&
          !option.childrenLoaded)
      )
    }

    function handleSelect(option: OptionState) {
      if (option.disabled) return

      if (props.multiple || props.noCascaded) {
        hasChildren(option) ? emit('select', option) : handleToggleCheck(option)
      } else {
        emit('select', option)
      }
    }

    function handleToggleCheck(option: OptionState) {
      !isCheckboxDisabled(option) && emit('check', option)
    }

    function handleMouseEnter(option: OptionState) {
      clearTimeout(hoverTimer)

      hoverTimer = window.setTimeout(() => {
        !option.disabled && emit('hover', option)
      }, 250)
    }

    function handleMouseLeave() {
      clearTimeout(hoverTimer)
    }

    return {
      nh,

      virtualList,

      hasChildren,
      isSelected,
      isCheckboxDisabled,
      handleSelect,
      handleToggleCheck,
      handleMouseEnter,
      handleMouseLeave
    }
  }
})
</script>
