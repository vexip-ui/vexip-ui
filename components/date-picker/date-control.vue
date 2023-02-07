<template>
  <div
    ref="wrapper"
    :class="className"
    tabindex="-1"
    @keydown="handleInput"
    @blur="handleBlur"
  >
    <div v-if="!focused && !isActivated" :class="nh.be('placeholder')">
      {{ placeholder }}
    </div>
    <template v-else>
      <div
        v-if="enabled.year"
        :class="[nh.be('unit'), getUnitFocusClass('year')]"
        @click="handleInputFocus('year')"
      >
        {{ formattedYear }}
      </div>
      <div v-if="labels.year" :class="nh.be('label')" @click="handleInputFocus('year')">
        {{ labels.year }}
      </div>
      <template v-if="enabled.month">
        <div v-if="enabled.year" :class="nh.be('separator')">
          {{ dateSeparator }}
        </div>
        <div
          :class="[nh.be('unit'), getUnitFocusClass('month')]"
          @click="handleInputFocus('month')"
        >
          {{ formattedMonth }}
        </div>
        <div v-if="labels.month" :class="nh.be('label')" @click="handleInputFocus('month')">
          {{ labels.month }}
        </div>
      </template>
      <template v-if="enabled.date">
        <div v-if="enabled.month || enabled.year" :class="nh.be('separator')">
          {{ dateSeparator }}
        </div>
        <div :class="[nh.be('unit'), getUnitFocusClass('date')]" @click="handleInputFocus('date')">
          {{ formattedDate }}
        </div>
        <div v-if="labels.date" :class="nh.be('label')" @click="handleInputFocus('date')">
          {{ labels.date }}
        </div>
      </template>

      <template v-if="showTimeUnits">
        <div :class="nh.be('pad')"></div>
        <div
          v-if="enabled.hour"
          :class="[nh.be('unit'), getUnitFocusClass('hour')]"
          @click="handleInputFocus('hour')"
        >
          {{ formattedHour }}
        </div>
        <div v-if="labels.hour" :class="nh.be('label')" @click="handleInputFocus('hour')">
          {{ labels.hour }}
        </div>
        <template v-if="enabled.minute">
          <div v-if="enabled.hour" :class="nh.be('separator')">
            {{ timeSeparator }}
          </div>
          <div
            :class="[nh.be('unit'), getUnitFocusClass('minute')]"
            @click="handleInputFocus('minute')"
          >
            {{ formattedMinute }}
          </div>
          <div v-if="labels.minute" :class="nh.be('label')" @click="handleInputFocus('minute')">
            {{ labels.minute }}
          </div>
        </template>
        <template v-if="enabled.second">
          <div v-if="enabled.minute || enabled.hour" :class="nh.be('separator')">
            {{ timeSeparator }}
          </div>
          <div
            :class="[nh.be('unit'), getUnitFocusClass('second')]"
            @click="handleInputFocus('second')"
          >
            {{ formattedSecond }}
          </div>
          <div v-if="labels.second" :class="nh.be('label')" @click="handleInputFocus('second')">
            {{ labels.second }}
          </div>
        </template>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useNameHelper } from '@vexip-ui/config'
import { doubleDigits } from '@vexip-ui/utils'
import { handleKeyEnter } from './helper'

import type { PropType } from 'vue'
import type { DateTimeType } from './symbol'

export default defineComponent({
  name: 'DateControl',
  props: {
    unitType: {
      type: String as PropType<DateTimeType | ''>,
      default: ''
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
    },
    hasError: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
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
    'next-unit',
    'blur'
  ],
  setup(props, { emit }) {
    const nh = useNameHelper('date-picker')

    const wrapper = ref<HTMLElement>()

    const isActivated = computed(() => {
      return (Object.keys(props.enabled) as DateTimeType[]).every(type => {
        return !props.enabled[type] || props.activated[type]
      })
    })
    const className = computed(() => {
      return {
        [nh.be('input')]: true,
        [nh.bem('input', 'activated')]: isActivated.value,
        [nh.bem('input', 'error')]: props.hasError
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

      return props.activated[type]
        ? isYear
          ? props.dateValue.year.toString().padStart(4, '0')
          : doubleDigits(props.dateValue[type])
        : `${isYear ? `${filler}${filler}` : ''}${filler}${filler}`
    }

    function getUnitFocusClass(type: DateTimeType) {
      return props.visible && props.unitType === type ? nh.bem('unit', 'focused') : null
    }

    function handleInputFocus(type: DateTimeType) {
      if (props.readonly) return

      emit('unit-focus', type)
    }

    function handleInput(event: KeyboardEvent) {
      if (!props.visible) return

      const type = handleKeyEnter(event)

      if (props.readonly) {
        switch (type) {
          case 'ok': {
            emit('enter')
            break
          }
          case 'esc': {
            emit('cancel')
            break
          }
        }

        return
      }

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

    function handleBlur() {
      emit('blur')
    }

    return {
      nh,

      isActivated,
      className,
      showTimeUnits,
      formattedYear,
      formattedMonth,
      formattedDate,
      formattedHour,
      formattedMinute,
      formattedSecond,

      wrapper,

      getUnitFocusClass,
      handleInputFocus,
      handleInput,
      handleBlur,

      focus: () => {
        wrapper.value?.focus()
      },
      blur: () => {
        wrapper.value?.blur()
      }
    }
  }
})
</script>
