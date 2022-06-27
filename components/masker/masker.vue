<template>
  <Portal v-if="!props.autoRemove || wrapShow" :to="transferTo">
    <div
      v-show="wrapShow"
      ref="wrapper"
      :class="className"
      v-bind="$attrs"
    >
      <transition
        v-if="!props.disabled"
        :appear="props.autoRemove"
        :name="props.maskTransition"
        @after-enter="afterOpen"
        @after-leave="afterClose"
      >
        <div v-show="currentActive" :class="nh.be('mask')" @click="handleClose">
          <div :class="nh.be('mask-inner')"></div>
        </div>
      </transition>
      <transition :appear="props.autoRemove" :name="props.transitionName">
        <slot :show="currentActive"></slot>
      </transition>
    </div>
  </Portal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick } from 'vue'
import { Portal } from '@/components/portal'
import { useNameHelper, useProps, booleanProp, booleanStringProp } from '@vexip-ui/config'
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
    transfer: booleanStringProp,
    autoRemove: booleanProp
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
      transfer: false,
      autoRemove: false
    })

    const nh = useNameHelper('masker')
    const currentActive = ref(props.active)
    const wrapShow = ref(props.active)

    const wrapper = ref<HTMLElement | null>(null)

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('inner')]: props.inner,
          [nh.bm('disabled')]: props.disabled
        }
      ]
    })
    const transferTo = computed(() => {
      return props.inner
        ? ''
        : typeof props.transfer === 'boolean' ? (props.transfer ? 'body' : '') : props.transfer
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

      let result: unknown = true

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
      nh,
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
