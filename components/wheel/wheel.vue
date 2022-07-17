<template>
  <div ref="wrapper" :class="className">
    <div
      v-if="props.arrow"
      ref="prevArrow"
      :class="[
        nh.be('arrow'),
        nh.bem('arrow', 'prev'),
        prevDisabled ? nh.bem('arrow', 'disabled') : ''
      ]"
      @click="handlePrev"
    >
      <Icon :icon="props.horizontal ? AngleLeft : AngleUp"></Icon>
    </div>
    <div :class="nh.be('scroll')" :style="scrollStyle">
      <Scroll
        ref="scroll"
        width="100%"
        height="100%"
        :pointer="props.pointer"
        :mode="props.horizontal ? 'horizontal' : 'vertical'"
        :delta-x="targetWidth"
        :delta-y="targetHeight"
        :on-before-scroll="beforeScroll"
        @wheel="handleWheel"
        @scroll-end="handleScrollEnd"
      >
        <ul ref="list" :class="nh.be('list')" :style="listStyle">
          <template v-if="isInit">
            <WheelItem
              v-for="(option, index) in normalizedOptions"
              :key="index"
              :value="option.value"
              :disabled="option.disabled"
            >
              <slot :option="option" :index="index">
                {{ option.label || String(option.value) }}
              </slot>
            </WheelItem>
          </template>
        </ul>
      </Scroll>
      <template v-if="props.candidate">
        <div :class="[nh.be('mask'), nh.bem('mask', 'top')]" :style="maskStyle"></div>
        <div :class="[nh.be('mask'), nh.bem('mask', 'bottom')]" :style="maskStyle"></div>
      </template>
    </div>
    <div
      v-if="props.arrow"
      ref="nextArrow"
      :class="[
        nh.be('arrow'),
        nh.bem('arrow', 'next'),
        nextDisabled ? nh.bem('arrow', 'disabled') : ''
      ]"
      @click="handleNext"
    >
      <Icon :icon="props.horizontal ? AngleRight : AngleDown"></Icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, provide, nextTick } from 'vue'
import WheelItem from './wheel-item.vue'
import { Icon } from '@/components/icon/'
import { Scroll } from '@/components/scroll'
import { useFieldStore } from '@/components/form'
import { useDisplay } from '@vexip-ui/mixins'
import {
  useNameHelper,
  useProps,
  stateProp,
  booleanProp,
  booleanStringProp,
  createStateProp
} from '@vexip-ui/config'
import { USE_TOUCH, debounce, debounceMinor } from '@vexip-ui/utils'
import { AngleUp, AngleRight, AngleDown, AngleLeft } from '@vexip-ui/icons'
import { WHEEL_STATE } from './symbol'

import type { PropType } from 'vue'
import type { ItemState } from './symbol'

type RawOption =
  | string
  | number
  | {
      value: string | number,
      label?: string,
      disabled?: boolean
    }

export default defineComponent({
  name: 'Wheel',
  components: {
    WheelItem,
    Icon,
    Scroll
  },
  props: {
    state: stateProp,
    horizontal: booleanProp,
    value: [String, Number],
    // 上下或左右两侧的候选数
    candidate: Number as PropType<0 | 1 | 2 | 3>,
    arrow: booleanProp,
    pointer: booleanProp,
    options: Array as PropType<RawOption[]>,
    insertEmpty: booleanStringProp
  },
  emits: ['change', 'prev', 'next', 'update:value'],
  setup(_props, { emit }) {
    const { state, validateField, getFieldValue, setFieldValue } = useFieldStore<string | number>()

    const props = useProps('wheel', _props, {
      state: createStateProp(state),
      horizontal: false,
      value: {
        default: () => getFieldValue(null!),
        static: true
      },
      candidate: {
        default: 2,
        validator: (value: number) => [0, 1, 2, 3].includes(value)
      },
      arrow: false,
      pointer: USE_TOUCH,
      options: {
        default: () => [],
        static: true
      },
      insertEmpty: false
    })

    const nh = useNameHelper('wheel')
    const items = ref(new Set<ItemState>())
    const currentActive = ref(0)
    const wrapperWidth = ref(0)
    const wrapperHeight = ref(0)
    const targetWidth = ref(0)
    const targetHeight = ref(0)
    const horizontalPadding = ref(0)
    const verticalPadding = ref(0)
    const isInit = ref(false)

    const wrapper = useDisplay(displayInit)
    const scroll = ref<InstanceType<typeof Scroll> | null>(null)

    const normalizedOptions = computed(() => {
      const options = props.options.map(option => {
        if (typeof option === 'object') return option

        return { value: option }
      })

      if (props.insertEmpty) {
        options.unshift({
          value: '',
          label: typeof props.insertEmpty === 'string' ? props.insertEmpty : '-'
        })
      }

      return options
    })
    const itemList = computed(() => {
      return Array.from(items.value)
    })
    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        nh.bm(props.horizontal ? 'horizontal' : 'vertical'),
        {
          [nh.bm(props.state)]: props.state !== 'default'
        }
      ]
    })
    const scrollStyle = computed(() => {
      if (props.horizontal) {
        return {
          width: wrapperWidth.value ? `${wrapperWidth.value}px` : undefined
        }
      }

      return {
        height: wrapperHeight.value ? `${wrapperHeight.value}px` : undefined
      }
    })
    const listStyle = computed(() => {
      if (props.horizontal) {
        return {
          paddingRight: `${horizontalPadding.value}px`,
          paddingLeft: `${horizontalPadding.value}px`
        }
      }

      return {
        paddingTop: `${verticalPadding.value}px`,
        paddingBottom: `${verticalPadding.value}px`
      }
    })
    const maskStyle = computed(() => {
      if (props.horizontal) {
        return {
          width: horizontalPadding.value ? `${horizontalPadding.value}px` : undefined
        }
      }

      return {
        height: verticalPadding.value ? `${verticalPadding.value}px` : undefined
      }
    })
    const prevDisabled = computed(() => {
      return !itemList.value.slice(0, currentActive.value).some(item => !item.disabled)
    })
    const nextDisabled = computed(() => {
      return (
        currentActive.value >= itemList.value.length - 1 ||
        !itemList.value
          .slice(currentActive.value + 1, itemList.value.length)
          .some(item => !item.disabled)
      )
    })

    provide(WHEEL_STATE, { increaseItem, decreaseItem })

    const updateActive = debounceMinor(() => {
      const active = Math.max(
        itemList.value.findIndex(item => item.value === props.value),
        0
      )

      currentActive.value = findEnabledActive(active)
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
      { immediate: true }
    )
    watch(() => props.horizontal, computeSize)
    watch(currentActive, () => {
      refreshScroll()

      const value = getItemValue()

      setFieldValue(value)
      emit('change', value)
      emit('update:value', value)
      validateField()
    })

    function queryEnabledActive(active: number, step: number) {
      step = step / Math.abs(step)

      while (itemList.value[active].disabled) {
        active += step

        if (active < 0 || active >= itemList.value.length) break
      }

      return active
    }

    function findEnabledActive(active: number, sign = 1) {
      if (itemList.value[active]?.disabled) {
        active = queryEnabledActive(active, 1 * sign)

        if (sign > 0 ? active >= itemList.value.length : active < 0) {
          active = queryEnabledActive(active, -1 * sign)

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
      const sign = props.horizontal ? signX : signY

      return !((sign < 0 && prevDisabled.value) || (sign > 0 && nextDisabled.value))
    }

    function handleScrollEnd({ clientX, clientY }: MouseEvent) {
      const aboutActive = props.horizontal
        ? clientX / targetWidth.value
        : clientY / targetHeight.value
      const active = Math.round(aboutActive)

      if (active !== currentActive.value) {
        currentActive.value = findEnabledActive(active, active > aboutActive ? 1 : -1)
      } else {
        refreshScroll()
      }
    }

    function handleWheel({ sign, clientX, clientY }: WheelEvent & { sign: 1 | -1 }) {
      const active = props.horizontal
        ? Math.round(clientX / targetWidth.value)
        : Math.round(clientY / targetHeight.value)

      currentActive.value = findEnabledActive(active, sign)
    }

    function getItemValue() {
      return itemList.value[currentActive.value]?.value
    }

    function handlePrev() {
      if (!prevDisabled.value) {
        currentActive.value = findEnabledActive(currentActive.value - 1, -1)
        emit('prev', getItemValue())
      }
    }

    function handleNext() {
      if (!nextDisabled.value) {
        currentActive.value = findEnabledActive(currentActive.value + 1, 1)
        emit('next', getItemValue())
      }
    }

    return {
      AngleUp,
      AngleRight,
      AngleDown,
      AngleLeft,

      props,
      nh,
      currentActive,
      isInit,
      targetWidth,
      targetHeight,

      normalizedOptions,
      itemList,
      className,
      scrollStyle,
      listStyle,
      maskStyle,
      prevDisabled,
      nextDisabled,

      wrapper,
      scroll,

      beforeScroll,
      handleWheel,
      handleScrollEnd,
      handlePrev,
      handleNext,

      refreshScroll
    }
  }
})
</script>
