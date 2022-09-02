<template>
  <CollapseTransition v-if="!hidden" fade-effect @after-leave="handleAfterLeave">
    <div v-if="!closed" :class="className" role="alert">
      <div :class="nh.be('wrapper')">
        <div v-if="hasTitle" :class="nh.be('title')">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div :class="nh.be('content')">
          <slot></slot>
        </div>
      </div>
      <button v-if="props.closable" :class="nh.be('close')" @click="handleClose">
        <slot name="close">
          <Icon label="close">
            <Xmark></Xmark>
          </Icon>
        </slot>
      </button>
      <div v-if="hasIcon" :class="nh.be('icon')">
        <slot name="icon">
          <Icon
            :icon="iconComp"
            :scale="hasTitle ? 2 : 1"
            :style="{ color: props.iconColor }"
          ></Icon>
        </slot>
      </div>
    </div>
  </CollapseTransition>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { useNameHelper, useProps, booleanProp, eventProp, emitEvent } from '@vexip-ui/config'

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
    manual: booleanProp,
    onClose: eventProp(),
    onHide: eventProp()
  },
  emits: [],
  setup(_props, { slots }) {
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

    const nh = useNameHelper('alert')

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
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm(props.type)]: props.type,
        [nh.bm('colorful-text')]: props.colorfulText,
        [nh.bm('has-title')]: hasTitle.value,
        [nh.bm('has-icon')]: hasIcon.value,
        [nh.bm('closable')]: props.closable,
        [nh.bm('no-border')]: !props.banner && props.noBorder,
        [nh.bm('banner')]: props.banner
      }
    })
    const iconComp = computed(() => {
      if (typeof props.icon === 'boolean') {
        return predefinedIcons[props.type] ?? null
      }

      return props.icon
    })

    function handleClose() {
      if (!props.manual) {
        closed.value = true
      }

      emitEvent(props.onClose)
    }

    function handleAfterLeave() {
      emitEvent(props.onHide)
      hidden.value = true
    }

    return {
      props,
      nh,

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
