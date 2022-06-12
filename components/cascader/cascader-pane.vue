<template>
  <div :class="`${prefix}__pane`">
    <VirtualList
      ref="virtualList"
      :items="options"
      :item-size="32"
      height="100%"
      id-key="id"
      :items-attrs="{
        class: [`${prefix}__options`]
      }"
    >
      <template #default="{ item, index }">
        <slot :option="item" :index="index">
          <Option
            :class="[`${prefix}__option`]"
            :value="item.value"
            :label="item.label"
            :disabled="item.disabled"
            :hitting="hasChildren(item) && item.id === openedId"
            :selected="values.includes(item.fullValue)"
            @select="handleSelect(item)"
            @mouseenter="handleMouseEnter(item)"
          >
            <Checkbox
              v-if="checkbox"
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
            <div v-if="hasChildren(item)" :class="`${prefix}__arrow`">
              <Icon><ChevronRight></ChevronRight></Icon>
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
import { ChevronRight } from '@vexip-ui/icons'

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
    ChevronRight
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
    checkbox: {
      type: Boolean,
      default: false
    },
    ready: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
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
      return !!(item.branch || item.children?.length)
    }

    function handleSelect(item: OptionState) {
      if (props.multiple) {
        hasChildren(item) ? emit('select', item.id) : handleToggleCheck(item)
      } else {
        emit('select', item.id)
      }
    }

    function handleToggleCheck(item: OptionState) {
      emit('check', item.id)
    }

    function handleMouseEnter(item: OptionState) {
      emit('hover', item.id)
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
