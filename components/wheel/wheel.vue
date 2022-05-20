<template>
  <div ref="wrapper" :class="className">
    <div
      v-if="arrow"
      ref="prevArrow"
      :class="[
        `${prefix}__arrow`,
        `${prefix}__arrow--prev`,
        prevDisabled ? `${prefix}__arrow--disabled` : ''
      ]"
      @click="handlePrev"
    >
      <Icon :icon="horizontal ? AngleLeft : AngleUp"></Icon>
    </div>
    <div :class="`${prefix}__scroll`" :style="scrollStyle">
      <Scroll
        ref="scroll"
        width="100%"
        height="100%"
        :pointer="pointer"
        :mode="horizontal ? 'horizontal' : 'vertical'"
        :delta-x="targetWidth"
        :delta-y="targetHeight"
        :before-scroll="beforeScroll"
        @on-wheel="handleWheel"
        @on-scroll-end="handleScrollEnd"
      >
        <ul ref="list" :class="`${prefix}__list`" :style="listStyle">
          <slot v-if="isInit"></slot>
        </ul>
      </Scroll>
      <template v-if="candidate">
        <div :class="[`${prefix}__mask`, `${prefix}__mask--top`]" :style="maskStyle"></div>
        <div :class="[`${prefix}__mask`, `${prefix}__mask--bottom`]" :style="maskStyle"></div>
      </template>
    </div>
    <div
      v-if="arrow"
      ref="nextArrow"
      :class="[
        `${prefix}__arrow`,
        `${prefix}__arrow--next`,
        nextDisabled ? `${prefix}__arrow--disabled` : ''
      ]"
      @click="handleNext"
    >
      <Icon :icon="horizontal ? AngleRight : AngleDown"></Icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, provide, inject, nextTick } from 'vue'
import { Icon } from '@/components/icon/'
import { Scroll } from '@/components/scroll'
import { VALIDATE_FIELD } from '@/components/form-item'
import { useDisplay } from '@vexip-ui/mixins'
import { useConfiguredProps } from '@vexip-ui/config'
import { noop, debounce, debounceMinor } from '@vexip-ui/utils'
import { AngleUp, AngleRight, AngleDown, AngleLeft } from '@vexip-ui/icons'
import { WHEEL_STATE } from './symbol'

import type { ItemState } from './symbol'

const props = useConfiguredProps('wheel', {
  horizontal: {
    type: Boolean,
    default: false
  },
  value: {
    type: [String, Number],
    default: null
  },
  // 上下或左右两侧的候选数
  candidate: {
    default: 2,
    validator: (value: number) => {
      return [0, 1, 2, 3].includes(value)
    }
  },
  arrow: {
    type: Boolean,
    default: false
  },
  pointer: {
    type: Boolean,
    default: false
  },
  disableValidate: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'Wheel',
  components: {
    Icon,
    Scroll
  },
  props,
  emits: ['on-change', 'on-prev', 'on-next', 'update:value'],
  setup(props, { emit }) {
    const validateField = inject(VALIDATE_FIELD, noop)

    const prefix = 'vxp-wheel'
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

    const itemList = computed(() => {
      return Array.from(items.value)
    })
    const className = computed(() => {
      return [prefix, `${prefix}-vars`, `${prefix}--${props.horizontal ? 'horizontal' : 'vertical'}`]
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

      emit('on-change', value)
      emit('update:value', value)

      if (!props.disableValidate) {
        validateField()
      }
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
        emit('on-prev', getItemValue())
      }
    }

    function handleNext() {
      if (!nextDisabled.value) {
        currentActive.value = findEnabledActive(currentActive.value + 1, 1)
        emit('on-next', getItemValue())
      }
    }

    return {
      AngleUp,
      AngleRight,
      AngleDown,
      AngleLeft,

      prefix,
      currentActive,
      isInit,
      targetWidth,
      targetHeight,

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
