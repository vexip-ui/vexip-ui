<template>
  <a
    :class="className"
    :href="to"
    :target="target"
    @click="handleClick"
  >
    <slot name="icon">
      <Icon v-if="icon" :class="`${prefix}__icon`" :name="icon"></Icon>
    </slot>
    <slot></slot>
  </a>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Icon } from '@/components/icon'
import { useConfiguredProps } from '@vexip-ui/config'

export type LinkerType = 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info'

const props = useConfiguredProps('linker', {
  to: {
    type: String,
    default: null
  },
  type: {
    default: 'default' as LinkerType,
    validator: (value: LinkerType) => {
      return ['default', 'primary', 'success', 'error', 'warning', 'info'].includes(value)
    }
  },
  icon: {
    type: String,
    default: ''
  },
  underline: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  target: {
    type: String,
    default: '_blank'
  }
})

export default defineComponent({
  name: 'Linker',
  components: {
    Icon
  },
  props,
  emits: ['on-click'],
  setup(props, { emit }) {
    const prefix = 'vxp-linker'

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}--${props.type}`]: props.type !== 'default',
        [`${prefix}--disabled`]: props.disabled,
        [`${prefix}--underline`]: props.underline
      }
    })

    function handleClick(event: MouseEvent) {
      emit('on-click', event)
    }

    return {
      prefix,

      className,

      handleClick
    }
  }
})
</script>
