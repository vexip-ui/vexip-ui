<script setup lang="ts">
import { computed, ref } from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { doubleDigits } from '@vexip-ui/utils'
import { handleKeyEnter } from './helper'

import type { PropType } from 'vue'
import type { LocaleConfig } from '@vexip-ui/config'
import type { TimeType } from './symbol'

defineOptions({ name: 'TimeControl' })

const props = defineProps({
  unitType: {
    type: String as PropType<TimeType | ''>,
    default: ''
  },
  enabled: {
    type: Object as PropType<Record<TimeType, boolean>>,
    default: () => ({})
  },
  activated: {
    type: Object as PropType<Record<TimeType, boolean>>,
    default: () => ({})
  },
  timeValue: {
    type: Object as PropType<Record<TimeType, number>>,
    default: () => ({})
  },
  separator: {
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
    validator: (value: string) => value.length === 1
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
    type: Object as PropType<Partial<Record<TimeType, string>>>,
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
  },
  labelBy: {
    type: String,
    default: undefined
  },
  locale: {
    type: Object as PropType<LocaleConfig['timePicker']>,
    default: () => ({})
  }
})

const emit = defineEmits([
  'input',
  'plus',
  'minus',
  'enter',
  'cancel',
  'unit-focus',
  'unit-blur',
  'prev-unit',
  'next-unit',
  'blur'
])

const nh = useNameHelper('time-picker')

const wrapper = ref<HTMLElement>()

const label = computed(() => props.locale.ariaLabel ?? {})
const isActivated = computed(() => {
  return (Object.keys(props.enabled) as TimeType[]).every(type => {
    return !props.enabled[type] || props.activated[type]
  })
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

defineExpose({
  isActivated,
  wrapper,
  focus: () => {
    wrapper.value?.focus()
  },
  blur: () => {
    wrapper.value?.blur()
  }
})

function formatValue(type: TimeType) {
  return props.activated[type]
    ? doubleDigits(props.timeValue[type])
    : `${props.filler}${props.filler}`
}

function getUnitFocusClass(type: TimeType) {
  return props.visible && props.unitType === type ? nh.bem('unit', 'focused') : null
}

function handleInputFocus(type: TimeType) {
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
      handleEnter()
      break
    }
    case 'esc': {
      handleCancel()
      break
    }
    default: {
      if (typeof type === 'number') {
        emit('input', type)
      }
    }
  }
}

function handleEnter() {
  emit('enter')
}

function handleCancel() {
  emit('cancel')
}

function handleBlur() {
  emit('blur')
}
</script>

<template>
  <div
    ref="wrapper"
    :class="[nh.be('input'), hasError && nh.bem('input', 'error')]"
    role="none"
    tabindex="-1"
    @keydown="handleInput"
    @blur="handleBlur"
  >
    <div v-if="!focused && !isActivated" :class="nh.be('placeholder')">
      {{ placeholder }}
    </div>
    <template v-else>
      <div
        v-if="enabled.hour"
        :class="[nh.be('unit'), getUnitFocusClass('hour')]"
        role="spinbutton"
        :aria-label="label.hour"
        :aria-valuenow="props.timeValue.hour"
        :aria-valuetext="formattedHour"
        :aria-valuemin="0"
        :aria-valuemax="23"
        :aria-labelledby="labelBy"
        @click="handleInputFocus('hour')"
      >
        {{ formattedHour }}
      </div>
      <div
        v-if="labels.hour"
        :class="nh.be('label')"
        aria-hidden
        @click="handleInputFocus('hour')"
      >
        {{ labels.hour }}
      </div>
      <template v-if="enabled.minute">
        <div v-if="enabled.hour" :class="nh.be('separator')" aria-hidden>
          {{ separator }}
        </div>
        <div
          :class="[nh.be('unit'), getUnitFocusClass('minute')]"
          role="spinbutton"
          :aria-label="label.minute"
          :aria-valuenow="props.timeValue.minute"
          :aria-valuetext="formattedMinute"
          :aria-valuemin="0"
          :aria-valuemax="59"
          :aria-labelledby="labelBy"
          @click="handleInputFocus('minute')"
        >
          {{ formattedMinute }}
        </div>
        <div
          v-if="labels.minute"
          :class="nh.be('label')"
          aria-hidden
          @click="handleInputFocus('minute')"
        >
          {{ labels.minute }}
        </div>
      </template>
      <template v-if="enabled.second">
        <div v-if="enabled.minute || enabled.hour" :class="nh.be('separator')" aria-hidden>
          {{ separator }}
        </div>
        <div
          :class="[nh.be('unit'), getUnitFocusClass('second')]"
          role="spinbutton"
          :aria-label="label.second"
          :aria-valuenow="props.timeValue.second"
          :aria-valuetext="formattedSecond"
          :aria-valuemin="0"
          :aria-valuemax="59"
          :aria-labelledby="labelBy"
          @click="handleInputFocus('second')"
        >
          {{ formattedSecond }}
        </div>
        <div
          v-if="labels.second"
          :class="nh.be('label')"
          aria-hidden
          @click="handleInputFocus('second')"
        >
          {{ labels.second }}
        </div>
      </template>
    </template>
  </div>
</template>
