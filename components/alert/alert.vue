<template>
  <CollapseTransition v-if="!hidden" fade-effect @after-leave="handleAfterLeave">
    <div v-if="!closed" :class="className">
      <div v-if="hasTitle" :class="`${prefix}__title`">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div :class="`${prefix}__description`">
        <slot></slot>
      </div>
      <div v-if="hasIcon" :class="`${prefix}__icon`">
        <slot name="icon">
          <Icon :icon="iconComp" :style="{ color: props.iconColor }"></Icon>
        </slot>
      </div>
      <div v-if="props.closable" :class="`${prefix}__close`" @click="handleClose">
        <slot name="close">
          <Icon><Xmark></Xmark></Icon>
        </slot>
      </div>
    </div>
  </CollapseTransition>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { useProps, booleanProp } from '@vexip-ui/config'

import {
  Flag,
  CircleInfo,
  CircleCheck,
  CircleExclamation,
  Xmark,
  CircleXmark
} from '@vexip-ui/icons'

import type { PropType } from 'vue'

export type AlertType = 'default' | 'info' | 'success' | 'warning' | 'error'

const predefinedIcons = {
  default: Flag,
  info: CircleInfo,
  success: CircleCheck,
  warning: CircleExclamation,
  error: CircleXmark
}

const alertTypes = Object.freeze<AlertType>(['default', 'info', 'success', 'warning', 'error'])

export default defineComponent({
  name: 'Alert',
  components: {
    CollapseTransition,
    Icon,
    Xmark
  },
  props: {
    type: String as PropType<AlertType>,
    title: String,
    colorfulText: booleanProp,
    icon: {
      type: [Boolean, Object],
      default: null
    },
    closable: booleanProp,
    iconColor: String,
    noBorder: booleanProp,
    banner: booleanProp,
    manual: booleanProp
  },
  emits: ['close', 'hide'],
  setup(_props, { slots, emit }) {
    const props = useProps('alert', _props, {
      type: {
        default: 'info' as AlertType,
        validator: (value: AlertType) => alertTypes.includes(value)
      },
      title: '',
      colorfulText: false,
      icon: false,
      closable: false,
      iconColor: '',
      noBorder: false,
      banner: false,
      manual: false
    })
    const prefix = 'vxp-alert'
    const closed = ref(false)
    const hidden = ref(false)

    const hasTitle = computed(() => {
      return !!(props.title || slots.title)
    })
    const hasIcon = computed(() => {
      return !!(props.icon || slots.icon)
    })
    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}--${props.type}`]: props.type,
        [`${prefix}--colorful-text`]: props.colorfulText,
        [`${prefix}--has-title`]: hasTitle.value,
        [`${prefix}--has-icon`]: hasIcon.value,
        [`${prefix}--closable`]: props.closable,
        [`${prefix}--no-border`]: !props.banner && props.noBorder,
        [`${prefix}--banner`]: props.banner
      }
    })
    const iconComp = computed(() => {
      if (typeof props.icon === 'boolean') {
        return predefinedIcons[props.type] ?? ''
      }

      return props.icon
    })

    function handleClose() {
      if (!props.manual) {
        closed.value = true
      }

      emit('close')
    }

    function handleAfterLeave() {
      emit('hide')
      hidden.value = true
    }

    return {
      props,

      prefix,
      closed,
      hidden,

      hasTitle,
      hasIcon,
      className,
      iconComp,

      handleClose,
      handleAfterLeave
    }
  }
})
</script>
