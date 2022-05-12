<template>
  <CollapseTransition fade-effect @after-leave="handleAfterLeave">
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
          <Icon :name="iconName" :style="{ color: iconColor }"></Icon>
        </slot>
      </div>
      <div v-if="closable" :class="`${prefix}__close`" @click="handleClose">
        <slot name="close">
          <Icon name="times"></Icon>
        </slot>
      </div>
    </div>
  </CollapseTransition>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { useConfiguredProps } from '@vexip-ui/config'

import '@/common/icons/flag'
import '@/common/icons/bell'
import '@/common/icons/info-circle'
import '@/common/icons/check-circle'
import '@/common/icons/exclamation-circle'
import '@/common/icons/times'
import '@/common/icons/times-circle'

export type AlertType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'

const predefinedIcons = {
  default: 'flag',
  primary: 'bell',
  info: 'info-circle',
  success: 'check-circle',
  warning: 'exclamation-circle',
  error: 'times-circle'
}

const props = useConfiguredProps('alert', {
  type: {
    default: 'info' as AlertType,
    validator: (value: AlertType) => {
      return ['default', 'primary', 'info', 'success', 'warning', 'error'].includes(value)
    }
  },
  title: {
    type: String,
    default: ''
  },
  colorfulText: {
    type: Boolean,
    default: false
  },
  icon: {
    type: [Boolean, String],
    default: false
  },
  closable: {
    type: Boolean,
    default: false
  },
  iconColor: {
    type: String,
    default: ''
  },
  noBorder: {
    type: Boolean,
    default: false
  },
  banner: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'Alert',
  components: {
    CollapseTransition,
    Icon
  },
  props,
  emits: ['on-close', 'on-hide'],
  setup(props, { slots, emit }) {
    const prefix = 'vxp-alert'
    const closed = ref(false)

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
    const iconName = computed(() => {
      if (typeof props.icon === 'boolean') {
        return predefinedIcons[props.type] ?? ''
      }

      return props.icon
    })

    function handleClose() {
      closed.value = true
      emit('on-close')
    }

    function handleAfterLeave() {
      emit('on-hide')
    }

    return {
      prefix,
      closed,

      hasTitle,
      hasIcon,
      className,
      iconName,

      handleClose,
      handleAfterLeave
    }
  }
})
</script>
