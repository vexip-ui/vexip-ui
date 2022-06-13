<template>
  <div :class="`${prefix}__pane`">
    <VirtualList
      ref="virtualList"
      :items="options"
      :item-size="32"
      height="100%"
      id-key="id"
      :items-attrs="{
        class: [`${prefix}__options`, multiple ? `${prefix}__options--multiple` : null]
      }"
    >
      <template #default="{ item, index }">
        <slot :option="item" :index="index">
          <Option
            :class="{
              'vxp-option--error': item.error
            }"
            :value="item.value"
            :label="item.label"
            :disabled="item.disabled"
            :selected="(hasChildren(item) && item.id === openedId) || values.includes(item.fullValue)"
            @select="handleSelect(item)"
            @mouseenter="handleMouseEnter(item)"
          >
            <Checkbox
              v-if="multiple"
              :class="`${prefix}__checkbox`"
              :checked="item.checked"
              :control="hasChildren(item)"
              :partial="item.partial"
              :disabled="item.disabled"
              size="small"
              @click.prevent.stop="handleToggleCheck(item)"
            ></Checkbox>
            <span :class="`${prefix}__label`">
              <slot name="label">
                {{ item.label }}
              </slot>
            </span>
            <div :class="`${prefix}__icon`">
              <Icon v-if="item.loading" pulse>
                <Spinner></Spinner>
              </Icon>
              <Icon v-else-if="item.error">
                <ArrowsRotate></ArrowsRotate>
              </Icon>
              <Icon v-else-if="hasChildren(item)">
                <ChevronRight></ChevronRight>
              </Icon>
              <Icon v-else-if="!multiple && checkIcon && values.includes(item.fullValue)" :icon="checkIcon"></Icon>
            </div>
          </Option>
        </slot>
      </template>
    </VirtualList>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { Checkbox } from '@/components/checkbox'
import { Icon } from '@/components/icon'
import { Option } from '@/components/option'
import { VirtualList } from '@/components/virtual-list'
import { ChevronRight, Check, Spinner, ArrowsRotate } from '@vexip-ui/icons'

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
    }
  },
  emits: ['select', 'check', 'hover'],
  setup(props, { emit }) {
    const prefix = 'vxp-cascader'
    const virtualList = ref<InstanceType<typeof VirtualList> & VirtualListExposed | null>(null)

    watch(
      () => props.ready,
      value => {
        value && virtualList.value?.refresh()
      }
    )

    function hasChildren(item: OptionState) {
      return !!(item.hasChild || item.children?.length)
    }

    function handleSelect(item: OptionState) {
      if (item.disabled) return

      if (props.multiple) {
        hasChildren(item) ? emit('select', item.id) : handleToggleCheck(item)
      } else {
        emit('select', item.id)
      }
    }

    function handleToggleCheck(item: OptionState) {
      !item.disabled && emit('check', item.id)
    }

    function handleMouseEnter(item: OptionState) {
      !item.disabled && emit('hover', item.id)
    }

    return {
      prefix,

      virtualList,

      hasChildren,
      handleSelect,
      handleToggleCheck,
      handleMouseEnter
    }
  }
})
</script>
