<script setup lang="ts">
import { Icon } from '@/components/icon/'
import { Renderer } from '@/components/renderer'
import { Scroll } from '@/components/scroll'
import { useFieldStore } from '@/components/form'

import { computed, nextTick, provide, ref, watch } from 'vue'

import WheelItem from './wheel-item.vue'
import { createStateProp, emitEvent, useIcons, useNameHelper, useProps } from '@vexip-ui/config'
import { useDisplay, useModifier, useRtl } from '@vexip-ui/hooks'
import { USE_TOUCH, boundRange, debounce, debounceMinor, toFalse } from '@vexip-ui/utils'
import { wheelProps } from './props'
import { WHEEL_STATE } from './symbol'

import type { ItemState, WheelOption, WheelSlots } from './symbol'

defineOptions({ name: 'Wheel' })

const { idFor, labelId, state, disabled, loading, validateField, getFieldValue, setFieldValue } =
  useFieldStore<string | number>(() => wrapper.value?.focus())

const _props = defineProps(wheelProps)
const props = useProps('wheel', _props, {
  state: createStateProp(state),
  horizontal: false,
  value: {
    default: () => getFieldValue(),
    static: true,
  },
  candidate: {
    default: 2,
    validator: value => [0, 1, 2, 3].includes(value),
  },
  arrow: false,
  pointer: USE_TOUCH,
  options: {
    default: () => [],
    static: true,
  },
  insertEmpty: false,
  disabled: () => disabled.value,
  loading: () => loading.value,
  loadingLock: false,
  disabledItem: {
    default: toFalse,
    isFunc: true,
  },
  noTransition: false,
  selectable: false,
  slots: () => ({}),
})

const emit = defineEmits(['update:value'])

defineSlots<WheelSlots>()

const nh = useNameHelper('wheel')
const icons = useIcons()

const items = ref(new Set<ItemState>())
const currentActive = ref(0)
const wrapperWidth = ref(0)
const wrapperHeight = ref(0)
const targetWidth = ref(0)
const targetHeight = ref(0)
const horizontalPadding = ref(0)
const verticalPadding = ref(0)
const isInit = ref(false)

const { isRtl } = useRtl()

const wrapper = useDisplay(displayInit)
const scroll = ref<InstanceType<typeof Scroll>>()

useModifier({
  target: wrapper,
  passive: false,
  onKeyDown: (event, modifier) => {
    if (modifier.up || modifier.down) {
      event.preventDefault()
      modifier.up ? handlePrev() : handleNext()
    }
  },
})

const normalizedOptions = computed<WheelOption[]>(() => {
  const options = props.options.map(option => {
    if (typeof option === 'object') {
      const { value, label, disabled = false } = option

      return {
        value,
        label: label || String(value),
        disabled,
        meta: option,
      }
    }

    return { value: option, label: String(option), disabled: false, meta: option }
  })

  if (props.insertEmpty) {
    options.unshift({
      value: '',
      label: typeof props.insertEmpty === 'string' ? props.insertEmpty : '-',
      disabled: false,
      meta: '',
    })
  }

  return options
})
const itemList = computed(() => {
  return Array.from(items.value)
})
const readonly = computed(() => props.loading && props.loadingLock)
const className = computed(() => {
  return [
    nh.b(),
    nh.bs('vars'),
    nh.bm(props.horizontal ? 'horizontal' : 'vertical'),
    {
      [nh.bm('inherit')]: props.inherit,
      [nh.bm(props.state)]: props.state !== 'default',
      [nh.bm('disabled')]: props.disabled,
      [nh.bm('readonly')]: readonly.value,
      [nh.bm('loading')]: props.loading,
    },
  ]
})
const listStyle = computed(() => {
  if (props.horizontal) {
    return {
      paddingRight: `${horizontalPadding.value}px`,
      paddingLeft: `${horizontalPadding.value}px`,
    }
  }

  return {
    paddingTop: `${verticalPadding.value}px`,
    paddingBottom: `${verticalPadding.value}px`,
  }
})
const maskStyle = computed(() => {
  if (props.horizontal) {
    return {
      width: horizontalPadding.value ? `${horizontalPadding.value}px` : undefined,
    }
  }

  return {
    height: verticalPadding.value ? `${verticalPadding.value}px` : undefined,
  }
})
const borderStyle = computed(() => {
  const style: Record<string, string> = {
    inset: props.horizontal
      ? `0 ${horizontalPadding.value - 1}px`
      : `${verticalPadding.value - 1}px 0`,
  }

  if (props.horizontal) {
    style.borderTop = '0'
    style.borderBottom = '0'
  } else {
    style.borderRight = '0'
    style.borderLeft = '0'
  }

  return style
})
const prevDisabled = computed(() => {
  return (
    props.disabled ||
    !itemList.value.slice(0, currentActive.value).some(item => !isItemDisabled(item))
  )
})
const nextDisabled = computed(() => {
  return (
    props.disabled ||
    currentActive.value >= itemList.value.length - 1 ||
    !itemList.value
      .slice(currentActive.value + 1, itemList.value.length)
      .some(item => !isItemDisabled(item))
  )
})
const prevIcon = computed(() =>
  props.horizontal
    ? isRtl.value
      ? icons.value.angleRight
      : icons.value.angleLeft
    : icons.value.angleUp,
)
const nextIcon = computed(() =>
  props.horizontal
    ? isRtl.value
      ? icons.value.angleLeft
      : icons.value.angleRight
    : icons.value.angleDown,
)

provide(WHEEL_STATE, { increaseItem, decreaseItem })

const updateActive = debounceMinor(() => {
  const active = Math.max(
    itemList.value.findIndex(item => item.value === props.value),
    0,
  )

  setActive(findEnabledActive(active))
})

const computeSize = debounceMinor(() => {
  nextTick(() => {
    const horizontal = props.horizontal

    itemList.value.forEach(item => {
      if (item && item.el) {
        targetWidth.value = Math.max(targetWidth.value, item.el.offsetWidth)
        targetHeight.value = Math.max(targetHeight.value, item.el.offsetHeight)
      }
    })

    const candidate = props.candidate
    const showCount = 2 * candidate + 1

    wrapperWidth.value = showCount * targetWidth.value
    wrapperHeight.value = showCount * targetHeight.value

    horizontalPadding.value = candidate * targetWidth.value
    verticalPadding.value = candidate * targetHeight.value

    items.value.forEach(item => {
      if (horizontal) {
        item.width = targetWidth.value
      } else {
        item.height = targetHeight.value
      }
    })

    setTimeout(() => {
      scroll.value?.refresh()
    }, 0)
  })
})

const refreshScroll = debounce(() => {
  if (scroll.value) {
    let targetXScroll = 0
    let targetYScroll = 0

    if (props.horizontal) {
      targetXScroll = currentActive.value * targetWidth.value
    } else {
      targetYScroll = currentActive.value * targetHeight.value
    }

    nextTick(() => {
      scroll.value?.scrollTo(targetXScroll, targetYScroll)
    })
  }
}, 20)

watch(
  () => props.value,
  () => {
    updateActive()
    refreshScroll()
  },
  { immediate: true },
)
watch(() => props.horizontal, computeSize)
watch(() => props.candidate, computeSize)

defineExpose({
  idFor,
  currentActive,
  isInit,
  targetWidth,
  targetHeight,
  wrapperWidth,
  wrapperHeight,
  itemList,
  wrapper,
  scroll,
  refreshScroll,
  focus: (options?: FocusOptions) => wrapper.value?.focus(options),
  blur: () => wrapper.value?.blur(),
})

function isItemDisabled(item: ItemState) {
  return item.disabled || props.disabledItem(item.value, item.meta)
}

function setActive(active: number) {
  if (currentActive.value === active) return

  currentActive.value = active

  const item = itemList.value[active]
  const value = item?.value

  refreshScroll()
  emit('update:value', value)
  setFieldValue(value)
  emitEvent(props.onChange, value, item?.meta)
  validateField()
}

function queryEnabledActive(active: number, step: number) {
  step = step / Math.abs(step)

  while (itemList.value[active].disabled) {
    active += step

    if (active < 0 || active >= itemList.value.length) break
  }

  return active
}

function findEnabledActive(active: number, sign = 1) {
  if (itemList.value[active] && isItemDisabled(itemList.value[active])) {
    active = queryEnabledActive(active, 1 * sign)

    if (sign > 0 ? active >= itemList.value.length : active < 0) {
      active = queryEnabledActive(boundRange(active, 0, itemList.value.length - 1), -1 * sign)

      // 全禁用
      if (sign > 0 ? active < 0 : active >= itemList.value.length) active = 0
    }
  }

  return active
}

function increaseItem(item: ItemState) {
  items.value.add(item)
  computeSize()
  updateActive()
}

function decreaseItem(item: ItemState) {
  items.value.delete(item)
  computeSize()
  updateActive()
}

function displayInit() {
  computeSize()
  scroll.value?.refresh()

  nextTick(() => {
    isInit.value = true

    updateActive()
    refreshScroll()
  })
}

function beforeScroll({ signX, signY }: { signX: number, signY: number }) {
  if (props.disabled || readonly.value) return false

  const sign = props.horizontal ? signX : signY

  return !((sign < 0 && prevDisabled.value) || (sign > 0 && nextDisabled.value))
}

function handleScrollEnd({ clientX, clientY }: { clientX: number, clientY: number }) {
  const aboutActive = props.horizontal ? clientX / targetWidth.value : clientY / targetHeight.value
  const active = Math.round(aboutActive)

  if (active !== currentActive.value) {
    setActive(findEnabledActive(active, active > aboutActive ? 1 : -1))
  } else {
    refreshScroll()
  }
}

function handleWheel({
  sign,
  clientX,
  clientY,
}: {
  clientX: number,
  clientY: number,
  sign: 1 | -1
}) {
  const active = props.horizontal
    ? Math.round(clientX / targetWidth.value)
    : Math.round(clientY / targetHeight.value)

  setActive(findEnabledActive(active, sign))
}

function handlePrev() {
  if (!prevDisabled.value) {
    setActive(findEnabledActive(currentActive.value - 1, -1))

    const item = itemList.value[currentActive.value]

    emitEvent(props.onPrev, item?.value, item?.meta)
  }
}

function handleNext() {
  if (!nextDisabled.value) {
    setActive(findEnabledActive(currentActive.value + 1, 1))

    const item = itemList.value[currentActive.value]

    emitEvent(props.onNext, item?.value, item?.meta)
  }
}

function handleItemClick(option: WheelOption, index: number) {
  if (props.selectable && !isItemDisabled(itemList.value[index])) {
    setActive(index)
  }

  emitEvent(props.onItemClick, option.value, option.meta)
}
</script>

<template>
  <div
    :id="idFor"
    ref="wrapper"
    :class="className"
    tabindex="0"
    role="group"
    :aria-labelledby="labelId"
  >
    <div
      v-if="props.arrow"
      ref="prevArrow"
      :class="[
        nh.be('arrow'),
        nh.bem('arrow', 'prev'),
        prevDisabled ? nh.bem('arrow', 'disabled') : ''
      ]"
      aria-hidden
      @click="handlePrev"
    >
      <Icon v-bind="prevIcon"></Icon>
    </div>
    <div :class="nh.be('scroll')" role="none">
      <Scroll
        ref="scroll"
        inherit
        :scroll-x="props.horizontal ? targetWidth * currentActive : 0"
        :scroll-y="props.horizontal ? 0 : targetHeight * currentActive"
        :width="props.horizontal ? wrapperWidth : '100%'"
        :height="props.horizontal ? '100%' : wrapperHeight"
        :pointer="props.pointer"
        :mode="props.horizontal ? 'horizontal' : 'vertical'"
        :delta-x="targetWidth"
        :delta-y="targetHeight"
        :on-before-scroll="beforeScroll"
        :no-transition="props.noTransition"
        @wheel="handleWheel"
        @scroll-end="handleScrollEnd"
      >
        <ul ref="list" :class="nh.be('list')" :style="listStyle">
          <template v-if="isInit">
            <WheelItem
              v-for="(option, index) in normalizedOptions"
              :key="index"
              :value="option.value"
              :disabled="option.disabled || props.disabledItem(option.value, option)"
              :active="currentActive === index"
              :meta="option.meta"
              @click="handleItemClick(option, index)"
            >
              <slot :option="option" :index="index">
                <Renderer :renderer="props.slots.default" :data="{ option, index }">
                  {{ option.label }}
                </Renderer>
              </slot>
            </WheelItem>
          </template>
        </ul>
      </Scroll>
      <template v-if="props.candidate">
        <div :class="[nh.be('mask'), nh.bem('mask', 'top')]" :style="maskStyle"></div>
        <div :class="[nh.be('mask'), nh.bem('mask', 'bottom')]" :style="maskStyle"></div>
      </template>
      <div
        :class="{
          [nh.be('border')]: true,
          [nh.bem('border', 'active')]: props.loading,
          [nh.bem('border', 'vertical')]: props.horizontal
        }"
        :style="borderStyle"
      ></div>
    </div>
    <div
      v-if="props.arrow"
      ref="nextArrow"
      :class="[
        nh.be('arrow'),
        nh.bem('arrow', 'next'),
        nextDisabled ? nh.bem('arrow', 'disabled') : ''
      ]"
      aria-hidden
      @click="handleNext"
    >
      <Icon v-bind="nextIcon"></Icon>
    </div>
  </div>
</template>
