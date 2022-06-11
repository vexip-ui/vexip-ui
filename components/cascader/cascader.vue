<template>
  <div ref="wrapper" :class="className">
    <div ref="reference" :class="selectorClass">
      <div v-if="hasPrefix" :class="`${prefixCls}__icon--prefix`" :style="{ color: props.prefixColor }">
        <slot name="prefix">
          <Icon :icon="props.prefix"></Icon>
        </slot>
      </div>
      <div :class="`${prefixCls}__control`">
        <slot name="control"></slot>
      </div>
      <transition name="vxp-fade">
        <div
          v-if="!props.disabled && props.clearable && isHover && hasValue"
          :class="`${prefixCls}__clear`"
          @click.stop="handleClear"
        >
          <Icon><CircleXmark></CircleXmark></Icon>
        </div>
        <div
          v-else-if="!noSuffix"
          :class="`${prefixCls}__icon--suffix`"
          :style="{ color: props.suffixColor }"
        >
          <slot name="suffix">
            <Icon
              v-if="props.suffix"
              :icon="props.suffix"
              :class="{
                [`${prefixCls}__arrow`]: !props.staticSuffix
              }"
            ></Icon>
            <Icon v-else :class="`${prefixCls}__arrow`">
              <ChevronDown></ChevronDown>
            </Icon>
          </slot>
        </div>
      </transition>
    </div>
    <Portal :to="transferTo">
      <transition :name="props.transitionName">
        <div
          v-show="currentVisible"
          ref="popper"
          :class="[`${prefixCls}__popper`, `${prefixCls}-vars`]"
          @click.stop
        ></div>
      </transition>
    </Portal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, computed, watch, inject } from 'vue'
import { Icon } from '@/components/icon'
import { Portal } from '@/components/portal'
import { CLEAR_FIELD } from '@/components/form-item'
import { useProps, booleanProp, booleanStringProp, sizeProp, stateProp, createSizeProp, createStateProp } from '@vexip-ui/config'
import { useHover, usePopper, placementWhileList, useClickOutside } from '@vexip-ui/mixins'
import { noop } from '@vexip-ui/utils'
import { ChevronDown, CircleXmark } from '@vexip-ui/icons'

import type { PropType } from 'vue'
import type { Placement } from '@vexip-ui/mixins'

export default defineComponent({
  name: 'Cascader',
  components: {
    Icon,
    Portal,
    ChevronDown,
    CircleXmark
  },
  props: {
    size: sizeProp,
    state: stateProp,
    value: [String, Number, Array] as PropType<string | number | (string | number)[]>,
    visible: booleanProp,
    options: Array,
    placeholder: String,
    prefix: Object,
    prefixColor: String,
    suffix: Object,
    suffixColor: String,
    noCascaded: booleanProp,
    multiple: booleanProp,
    disabled: booleanProp,
    disableValidate: booleanProp,
    clearable: booleanProp,
    placement: String as PropType<Placement>,
    transfer: booleanStringProp,
    staticSuffix: booleanProp,
    noSuffix: booleanProp,
    transitionName: String
  },
  emits: ['toggle', 'clear', 'update:visible'],
  setup(_props, { emit, slots }) {
    const props = useProps('cascader', _props, {
      size: createSizeProp(),
      state: createStateProp(),
      value: {
        default: null,
        static: true
      },
      visible: {
        default: false,
        static: true
      },
      options: {
        default: () => [],
        static: true
      },
      placeholder: null,
      prefix: null,
      prefixColor: '',
      suffix: null,
      suffixColor: '',
      noCascaded: false,
      multiple: false,
      disabled: false,
      disableValidate: false,
      clearable: false,
      placement: {
        default: 'bottom' as Placement,
        validator: (value: Placement) => placementWhileList.includes(value)
      },
      transfer: false,
      staticSuffix: false,
      noSuffix: false,
      transitionName: 'vxp-drop'
    })

    const clearField = inject(CLEAR_FIELD, noop)

    const prefix = 'vxp-cascader'
    const currentVisible = ref(props.visible)
    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')

    const wrapper = useClickOutside()
    const { reference, popper, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper,
      isDrop: true
    })
    const { isHover } = useHover(reference)

    const className = computed(() => {
      return {
        [prefix]: true,
        'vxp-input-vars': true,
        [`${prefix}-vars`]: true,
        [`${prefix}--multiple`]: props.multiple
      }
    })
    const selectorClass = computed(() => {
      const baseCls = `${prefix}__selector`

      return {
        [baseCls]: true,
        [`${baseCls}--focused`]: !props.disabled && currentVisible.value,
        [`${baseCls}--disabled`]: props.disabled,
        [`${baseCls}--${props.size}`]: props.size !== 'default',
        [`${baseCls}--${props.state}`]: props.state !== 'default',
        [`${baseCls}--has-prefix`]: hasPrefix.value,
        [`${baseCls}--has-suffix`]: !props.noSuffix
      }
    })
    const hasValue = computed(() => true)
    const hasPrefix = computed(() => {
      return !!(slots.prefix || props.prefix)
    })

    watch(
      () => props.visible,
      value => {
        currentVisible.value = value
      }
    )
    watch(currentVisible, value => {
      if (value) {
        updatePopper()
      }

      emit('toggle', value)
      emit('update:visible', value)
    })

    function handleClear() {
      if (props.clearable) {
        emit('clear')
        clearField()
      }
    }

    return {
      props,
      prefixCls: prefix,
      currentVisible,
      transferTo,
      isHover,

      className,
      selectorClass,
      hasValue,
      hasPrefix,

      wrapper,
      reference,
      popper,

      handleClear
    }
  }
})
</script>
