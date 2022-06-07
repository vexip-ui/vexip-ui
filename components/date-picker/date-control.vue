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
    <div v-if="labels.year" :class="`${prefixCls}__label`">
      {{ labels.year }}
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
      <div v-if="labels.month" :class="`${prefixCls}__label`">
        {{ labels.month }}
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
      <div v-if="labels.date" :class="`${prefixCls}__label`">
        {{ labels.date }}
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
      <div v-if="labels.hour" :class="`${prefixCls}__label`">
        {{ labels.hour }}
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
        <div v-if="labels.minute" :class="`${prefixCls}__label`">
          {{ labels.minute }}
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
        <div v-if="labels.second" :class="`${prefixCls}__label`">
          {{ labels.second }}
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { doubleDigits } from '@vexip-ui/utils'
import { handleKeyEnter } from './helper'

import type { PropType } from 'vue'
import type { DateTimeType } from './symbol'

export default defineComponent({
  name: 'DateControl',
  props: {
    unitType: {
      type: String as PropType<DateTimeType | ''>,
      default: 'date'
    },
    enabled: {
      type: Object as PropType<Record<DateTimeType, boolean>>,
      default: () => ({})
    },
    activated: {
      type: Object as PropType<Record<DateTimeType, boolean>>,
      default: () => ({})
    },
    dateValue: {
      type: Object as PropType<Record<DateTimeType, number>>,
      default: () => ({})
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
      validator: (value: string) => {
        return value.length === 1
      }
    },
    noFiller: {
      type: Boolean,
      default: false
    },
    steps: {
      type: Array as PropType<number[]>,
      default: () => [1, 1, 1]
    },
    ctrlSteps: {
      type: Array as PropType<number[]>,
      default: () => [5, 5, 5]
    },
    labels: {
      type: Object as PropType<Partial<Record<DateTimeType, string>>>,
      default: () => ({})
    }
  },
  emits: [
    'input',
    'plus',
    'minus',
    'enter',
    'cancel',
    'unit-focus',
    'prev-unit',
    'next-unit'
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
      emit('unit-focus', type)
    }

    function handleInput(event: KeyboardEvent) {
      const type = handleKeyEnter(event)

      switch (type) {
        case 'next': {
          emit('next-unit')
          break
        }
        case 'prev': {
          emit('prev-unit')
          break
        }
        case 'up': {
          emit('minus', event.ctrlKey)
          break
        }
        case 'down': {
          emit('plus', event.ctrlKey)
          break
        }
        case 'ok': {
          emit('enter')
          break
        }
        case 'esc': {
          emit('cancel')
          break
        }
        default: {
          if (typeof type === 'number') {
            emit('input', type)
          }
        }
      }
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
