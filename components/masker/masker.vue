<template>
  <Portal :to="transferTo">
    <div
      v-show="wrapShow"
      ref="wrapper"
      :class="className"
      v-bind="$attrs"
    >
      <transition
        v-if="!disabled"
        :name="maskTransition"
        @after-enter="afterOpen"
        @after-leave="afterClose"
      >
        <div v-show="currentActive" :class="`${prefix}__mask`" @click="handleClose">
          <div :class="`${prefix}__mask-inner`"></div>
        </div>
      </transition>
      <transition :name="transitionName">
        <slot :show="currentActive"></slot>
      </transition>
    </div>
  </Portal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick } from 'vue'
import { Portal } from '@/components/portal'
import { useConfiguredProps } from '@vexip-ui/config'
import { isPromise } from '@vexip-ui/utils'

import type { PropType } from 'vue'

const props = useConfiguredProps('masker', {
  active: {
    type: Boolean,
    default: false
  },
  closable: {
    type: Boolean,
    default: false
  },
  inner: {
    type: Boolean,
    default: false
  },
  maskTransition: {
    type: String,
    default: 'vxp-fade'
  },
  transitionName: {
    type: String,
    default: 'vxp-fade'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  beforeClose: {
    type: Function as PropType<() => any | Promise<any>>,
    default: null
  },
  transfer: {
    type: [Boolean, String],
    default: false
  }
})

export default defineComponent({
  name: 'Masker',
  components: {
    Portal
  },
  props,
  emits: ['on-toggle', 'before-close', 'on-close', 'on-hide', 'on-show', 'update:active'],
  setup(props, { emit }) {
    const prefix = 'vxp-masker'
    const currentActive = ref(props.active)
    const wrapShow = ref(props.active)

    const wrapper = ref<HTMLElement | null>(null)

    const className = computed(() => {
      return [
        prefix,
        `${prefix}-vars`,
        {
          [`${prefix}--inner`]: props.inner,
          [`${prefix}--disabled`]: props.disabled
        }
      ]
    })
    const transferTo = computed(() => {
      return typeof props.transfer === 'boolean' ? (props.transfer ? 'body' : '') : props.transfer
    })

    watch(
      () => props.active,
      value => {
        currentActive.value = value

        if (value) {
          wrapShow.value = value
        }
      }
    )
    watch(currentActive, value => {
      emit('on-toggle', value)
      emit('update:active', value)
    })

    function toggleActive(value: boolean) {
      currentActive.value = value
    }

    async function handleClose() {
      if (!props.closable) return

      let result = true

      if (typeof props.beforeClose === 'function') {
        result = props.beforeClose()

        if (isPromise(result)) {
          result = await result
        }
      }

      if (result !== false) {
        nextTick(() => {
          toggleActive(false)
          emit('on-close')
        })
      }
    }

    function afterClose() {
      nextTick(() => {
        wrapShow.value = false
        emit('on-hide')
      })
    }

    function afterOpen() {
      nextTick(() => {
        emit('on-show')
      })
    }

    return {
      prefix,
      currentActive,
      wrapShow,

      className,
      transferTo,

      wrapper,

      handleClose,
      afterClose,
      afterOpen
    }
  }
})
</script>
