<template>
  <div
    ref="wrapper"
    :class="className"
    tabindex="-1"
    @keydown="handleInput"
  >
    <div
      v-if="enabled.year"
      :class="[
        `${prefixCls}__unit`,
        visible && unitType === 'year' ? `${prefixCls}__unit--focused` : ''
      ]"
      @click="handleInputFocus('year')"
    >
      {{ formattedYear }}
    </div>
    <template v-if="enabled.month">
      <div v-if="enabled.year" :class="`${prefixCls}__separator`">
        {{ dateSeparator }}
      </div>
      <div
        :class="[
          `${prefixCls}__unit`,
          visible && unitType === 'month' ? `${prefixCls}__unit--focused` : ''
        ]"
        @click="handleInputFocus('month')"
      >
        {{ formattedMonth }}
      </div>
    </template>
    <template v-if="enabled.date">
      <div v-if="enabled.month || enabled.year" :class="`${prefixCls}__separator`">
        {{ dateSeparator }}
      </div>
      <div
        :class="[
          `${prefixCls}__unit`,
          visible && unitType === 'date' ? `${prefixCls}__unit--focused` : ''
        ]"
        @click="handleInputFocus('date')"
      >
        {{ formattedDate }}
      </div>
    </template>

    <template v-if="showTimeUnits">
      <div
        v-if="enabled.hour"
        :class="[
          `${prefixCls}__unit`,
          visible && unitType === 'hour' ? `${prefixCls}__unit--focused` : ''
        ]"
        @click="handleInputFocus('hour')"
      >
        {{ formattedHour }}
      </div>
      <template v-if="enabled.minute">
        <div v-if="enabled.hour" :class="`${prefixCls}__separator`">
          {{ timeSeparator }}
        </div>
        <div
          :class="[
            `${prefixCls}__unit`,
            visible && unitType === 'minute' ? `${prefixCls}__unit--focused` : ''
          ]"
          @click="handleInputFocus('minute')"
        >
          {{ formattedMinute }}
        </div>
      </template>
      <template v-if="enabled.second">
        <div v-if="enabled.minute || enabled.hour" :class="`${prefixCls}__separator`">
          {{ timeSeparator }}
        </div>
        <div
          :class="[
            `${prefixCls}__unit`,
            visible && unitType === 'second' ? `${prefixCls}__unit--focused` : ''
          ]"
          @click="handleInputFocus('second')"
        >
          {{ formattedSecond }}
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useConfiguredProps } from '@/common/config/install'
import { doubleDigits } from '@/common/utils/number'
import { handleKeyEnter } from './helper'

import type { PropType } from 'vue'
import type { DateTimeType } from './symbol'

const props = useConfiguredProps(Symbol('dateControl'), {
  unitType: {
    type: String as PropType<DateTimeType>,
    default: 'date'
  },
  enabled: {
    type: Object as PropType<Record<DateTimeType, boolean>>,
    default() {
      return {}
    }
  },
  activated: {
    type: Object as PropType<Record<DateTimeType, boolean>>,
    default() {
      return {}
    }
  },
  dateValue: {
    type: Object as PropType<Record<DateTimeType, number>>,
    default() {
      return {}
    }
  },
  dateSeparator: {
    type: String,
    default: '/'
  },
  timeSeparator: {
    type: String,
    default: ':'
  },
  visible: {
    type: Boolean,
    default: false
  },
  focused: {
    type: Boolean,
    default: false
  },
  filler: {
    type: String,
    default: '-',
    validator(value: string) {
      return value.length === 1
    }
  },
  noFiller: {
    type: Boolean,
    default: false
  },
  steps: {
    type: Array as PropType<number[]>,
    default() {
      return [1, 1, 1]
    }
  },
  ctrlSteps: {
    type: Array as PropType<number[]>,
    default() {
      return [5, 5, 5]
    }
  }
})

export default defineComponent({
  name: 'DateControl',
  props,
  emits: [
    'on-input',
    'on-plus',
    'on-minus',
    'on-enter',
    'on-cancel',
    'on-unit-focus',
    'on-prev-unit',
    'on-next-unit'
  ],
  setup(props, { emit }) {
    const prefix = 'vxp-date-picker'

    const wrapper = ref<HTMLElement | null>(null)

    const isActivated = computed(() => {
      return (Object.keys(props.enabled) as DateTimeType[]).every(type => {
        return !props.enabled[type] || props.activated[type]
      })
    })
    const className = computed(() => {
      return {
        [`${prefix}__input`]: true,
        [`${prefix}__input--activated`]: isActivated.value
      }
    })
    const showTimeUnits = computed(() => {
      return props.enabled.hour || props.enabled.minute || props.enabled.second
    })
    const formattedYear = computed(() => {
      return formatValue('year')
    })
    const formattedMonth = computed(() => {
      return formatValue('month')
    })
    const formattedDate = computed(() => {
      return formatValue('date')
    })
    const formattedHour = computed(() => {
      return formatValue('hour')
    })
    const formattedMinute = computed(() => {
      return formatValue('minute')
    })
    const formattedSecond = computed(() => {
      return formatValue('second')
    })

    function formatValue(type: DateTimeType) {
      const isYear = type === 'year'
      const filler = props.filler

      return props.noFiller || props.activated[type]
        ? isYear
          ? props.dateValue.year.toString().padStart(4, '0')
          : doubleDigits(props.dateValue[type])
        : `${isYear ? `${filler}${filler}` : ''}${filler}${filler}`
    }

    function handleInputFocus(type: DateTimeType) {
      emit('on-unit-focus', type)
    }

    function handleInput(event: KeyboardEvent) {
      const type = handleKeyEnter(event)

      switch (type) {
        case 'next': {
          emit('on-next-unit')
          break
        }
        case 'prev': {
          emit('on-prev-unit')
          break
        }
        case 'up': {
          emit('on-minus', event.ctrlKey)
          break
        }
        case 'down': {
          emit('on-plus', event.ctrlKey)
          break
        }
        case 'ok': {
          handleEnter()
          break
        }
        case 'esc': {
          handleCancel()
          break
        }
        default: {
          if (typeof type === 'number') {
            emit('on-input', type)
          }
        }
      }
    }

    function handleEnter() {
      emit('on-enter')
    }

    function handleCancel() {
      emit('on-cancel')
    }

    return {
      prefixCls: prefix,

      className,
      showTimeUnits,
      formattedYear,
      formattedMonth,
      formattedDate,
      formattedHour,
      formattedMinute,
      formattedSecond,

      wrapper,

      handleInputFocus,
      handleInput,

      focus: () => {
        wrapper.value?.focus()
      }
    }
  }
})
</script>
