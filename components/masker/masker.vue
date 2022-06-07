<template>
  <Portal :to="transferTo">
    <div
      v-show="wrapShow"
      ref="wrapper"
      :class="className"
      v-bind="$attrs"
    >
      <transition
        v-if="!props.disabled"
        :name="props.maskTransition"
        @after-enter="afterOpen"
        @after-leave="afterClose"
      >
        <div v-show="currentActive" :class="`${prefix}__mask`" @click="handleClose">
          <div :class="`${prefix}__mask-inner`"></div>
        </div>
      </transition>
      <transition :name="props.transitionName">
        <slot :show="currentActive"></slot>
      </transition>
    </div>
  </Portal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick } from 'vue'
import { Portal } from '@/components/portal'
import { useProps, booleanProp } from '@vexip-ui/config'
import { isPromise } from '@vexip-ui/utils'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'Masker',
  components: {
    Portal
  },
  props: {
    active: booleanProp,
    closable: booleanProp,
    inner: booleanProp,
    maskTransition: String,
    transitionName: String,
    disabled: booleanProp,
    onBeforeClose: Function as PropType<() => any | Promise<any>>,
    transfer: [Boolean, String]
  },
  emits: ['toggle', 'close', 'hide', 'show', 'update:active'],
  setup(_props, { emit }) {
    const props = useProps('masker', _props, {
      active: {
        default: false,
        static: true
      },
      closable: false,
      inner: false,
      maskTransition: 'vxp-fade',
      transitionName: 'vxp-fade',
      disabled: false,
      onBeforeClose: {
        default: null,
        isFunc: true
      },
      transfer: false
    })

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
      emit('toggle', value)
      emit('update:active', value)
    })

    function toggleActive(value: boolean) {
      currentActive.value = value
    }

    async function handleClose() {
      if (!props.closable) return

      let result = true

      if (typeof props.onBeforeClose === 'function') {
        result = props.onBeforeClose()

        if (isPromise(result)) {
          result = await result
        }
      }

      if (result !== false) {
        nextTick(() => {
          toggleActive(false)
          emit('close')
        })
      }
    }

    function afterClose() {
      nextTick(() => {
        wrapShow.value = false
        emit('hide')
      })
    }

    function afterOpen() {
      nextTick(() => {
        emit('show')
      })
    }

    return {
      props,
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
