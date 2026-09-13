<script setup lang="ts">
import { computed } from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { toAttrValue } from '@vexip-ui/utils'

import type { PropType } from 'vue'
import type { LocaleConfig } from '@vexip-ui/config'
import type { MonthIndex, WeekIndex } from './symbol'

const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
  locale: {
    type: Object as PropType<LocaleConfig['calendar']>,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  hovered: {
    type: Boolean,
    default: false,
  },
  isPrev: {
    type: Boolean,
    default: false,
  },
  isNext: {
    type: Boolean,
    default: false,
  },
  isToday: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  inRange: {
    type: Boolean,
    default: false,
  },
  selectRow: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select', 'hover'])

defineSlots<{
  item: (params: {
    date: Date,
    label: string,
    selected: boolean,
    hovered: boolean,
    isPrev: boolean,
    isNext: boolean,
    isToday: boolean,
    disabled: boolean,
    inRange: boolean,
  }) => any,
  default: (params: {
    date: Date,
    label: string,
    selected: boolean,
    hovered: boolean,
    isPrev: boolean,
    isNext: boolean,
    isToday: boolean,
    disabled: boolean,
    inRange: boolean,
  }) => any,
}>()

const nh = useNameHelper('calendar')

const label = computed(() => {
  const label = props.locale.ariaLabel
  const year = props.date.getFullYear()
  const month = (props.date.getMonth() + 1) as MonthIndex
  const day = props.date.getDate()
  const weekDay = (props.date.getDay() || 7) as WeekIndex

  return `${label[`week${weekDay}`]}, ${label[`month${month}`]} ${day}, ${year}`
})

const inRange = computed(() => {
  return props.selectRow ? props.selected || props.inRange : props.inRange
})
</script>

<template>
  <div
    :class="nh.be('cell')"
    role="gridcell"
    :aria-selected="toAttrValue(selected)"
    :aria-disabled="toAttrValue(disabled)"
    @mouseenter="emit('hover', date)"
  >
    <slot
      name="item"
      :date="date"
      :label="label"
      :selected="selected"
      :hovered="hovered"
      :is-prev="isPrev"
      :is-next="isNext"
      :is-today="isToday"
      :disabled="disabled"
      :in-range="inRange"
    >
      <div
        :class="{
          [nh.be('index')]: true,
          [nh.bem('index', 'selected')]: selected,
          [nh.bem('index', 'hovered')]: hovered,
          [nh.bem('index', 'prev')]: isPrev,
          [nh.bem('index', 'next')]: isNext,
          [nh.bem('index', 'today')]: isToday,
          [nh.bem('index', 'disabled')]: disabled,
          [nh.bem('index', 'in-range')]: inRange,
        }"
        tabindex="0"
        role="button"
        :aria-label="label"
        :aria-disabled="toAttrValue(disabled)"
        @click="emit('select', date)"
        @keydown.enter.prevent="emit('select', date)"
        @keydown.space.prevent="emit('select', date)"
      >
        <slot
          :date="date"
          :label="label"
          :selected="selected"
          :hovered="hovered"
          :is-prev="isPrev"
          :is-next="isNext"
          :is-today="isToday"
          :disabled="disabled"
          :in-range="inRange"
        >
          <div :class="nh.be('index-inner')">
            {{ date.getDate() }}
          </div>
        </slot>
      </div>
    </slot>
  </div>
</template>
