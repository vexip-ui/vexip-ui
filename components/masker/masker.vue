<template>
  <Portal v-if="!props.autoRemove || wrapShow" :to="transferTo">
    <div
      v-show="wrapShow"
      ref="wrapper"
      :class="className"
      tabindex="-1"
      v-bind="$attrs"
      @focusin="handleFocusIn"
      @keydown.escape.prevent="handleClose"
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
      <span
        ref="topTrap"
        tabindex="0"
        aria-hidden="true"
        style="width: 0; height: 0; overflow: hidden; outline: none;"
      ></span>
      <transition :appear="props.autoRemove" :name="props.transitionName">
        <slot :show="currentActive"></slot>
      </transition>
      <span
        ref="bottomTrap"
        tabindex="0"
        aria-hidden="true"
        style="width: 0; height: 0; overflow: hidden; outline: none;"
      ></span>
    </div>
  </Portal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick } from 'vue'
import { Portal } from '@/components/portal'
import {
  useNameHelper,
  useProps,
  booleanProp,
  booleanStringProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { isPromise, queryTabables } from '@vexip-ui/utils'

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
    autoRemove: booleanProp,
    onToggle: eventProp<(active: boolean) => void>(),
    onClose: eventProp(),
    onHide: eventProp(),
    onShow: eventProp()
  },
  emits: ['update:active'],
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
    const topTrap = ref<HTMLElement | null>(null)
    const bottomTrap = ref<HTMLElement | null>(null)

    let showing = false
    let prevFocusdEl: HTMLElement | null = null

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
        : typeof props.transfer === 'boolean'
          ? props.transfer
            ? 'body'
            : ''
          : props.transfer
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
      if (!value) {
        showing = false

        if (prevFocusdEl) {
          prevFocusdEl.focus()
          prevFocusdEl = null
        }
      }

      emitEvent(props.onToggle, value)
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
          emitEvent(props.onClose)
        })
      }
    }

    function afterClose() {
      nextTick(() => {
        wrapShow.value = false
        emitEvent(props.onHide)
      })
    }

    function afterOpen() {
      prevFocusdEl = document.activeElement as HTMLElement
      topTrap.value?.focus()
      nextTick(() => {
        showing = true
        emitEvent(props.onShow)
      })
    }

    function handleFocusIn(event: FocusEvent) {
      const target = event.target as HTMLElement

      if (!showing || !wrapper.value || !target || !topTrap.value || !bottomTrap.value) {
        return
      }

      const tabables = queryTabables(wrapper.value)

      if (!tabables.length) {
        return
      }

      if (topTrap.value === target) {
        tabables.at(-1)!.focus()
      } else if (bottomTrap.value === target) {
        tabables[0].focus()
      }
    }

    return {
      props,
      nh,
      currentActive,
      wrapShow,

      className,
      transferTo,

      wrapper,
      topTrap,
      bottomTrap,

      handleClose,
      afterClose,
      afterOpen,
      handleFocusIn
    }
  }
})
</script>
