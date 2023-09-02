<template>
  <Portal v-if="!props.autoRemove || wrapShow" :to="transferTo">
    <div
      v-bind="$attrs"
      ref="wrapper"
      :class="className"
      tabindex="-1"
      :style="{
        zIndex,
        pointerEvents: wrapShow ? undefined : 'none',
        visibility: wrapShow ? undefined : 'hidden'
      }"
      @focusin="handleFocusIn"
      @keydown.escape.prevent="handleClose"
    >
      <ResizeObserver v-if="!props.disabled" @resize="handleResize">
        <Transition
          :appear="props.autoRemove"
          :name="props.maskTransition"
          @after-enter="afterOpen"
          @after-leave="afterClose"
        >
          <div v-show="currentActive" :class="nh.be('mask')" @click="handleMaskClick">
            <slot name="mask">
              <div :class="nh.be('mask-inner')"></div>
            </slot>
          </div>
        </Transition>
      </ResizeObserver>
      <span
        ref="topTrap"
        tabindex="0"
        aria-hidden="true"
        style="width: 0; height: 0; overflow: hidden; outline: none"
      ></span>
      <Transition
        v-if="props.transitionName"
        :appear="props.autoRemove"
        :name="props.transitionName"
      >
        <slot :show="currentActive"></slot>
      </Transition>
      <slot v-else :show="currentActive"></slot>
      <span
        ref="bottomTrap"
        tabindex="0"
        aria-hidden="true"
        style="width: 0; height: 0; overflow: hidden; outline: none"
      ></span>
    </div>
  </Portal>
</template>

<script lang="ts">
import { Portal } from '@/components/portal'
import { ResizeObserver } from '@/components/resize-observer'

import { computed, defineComponent, nextTick, ref, watch } from 'vue'

import { emitEvent, useNameHelper, useProps, useZIndex } from '@vexip-ui/config'
import { isPromise, queryTabables } from '@vexip-ui/utils'
import { maskerProps } from './props'

export default defineComponent({
  name: 'Masker',
  components: {
    Portal,
    ResizeObserver
  },
  props: maskerProps,
  emits: ['update:active'],
  setup(_props, { emit }) {
    const nh = useNameHelper('masker')
    const props = useProps('masker', _props, {
      active: {
        default: false,
        static: true
      },
      closable: false,
      inner: false,
      maskTransition: () => nh.ns('fade'),
      transitionName: () => nh.ns('fade'),
      disabled: false,
      onBeforeClose: {
        default: null,
        isFunc: true
      },
      transfer: false,
      autoRemove: false,
      permeable: false
    })

    const getIndex = useZIndex()

    const currentActive = ref(props.active)
    // If initial active, we should set a valid index as initial value
    const zIndex = ref(props.active ? getIndex() : 0)
    const wrapShow = ref(props.active)

    const wrapper = ref<HTMLElement>()
    const topTrap = ref<HTMLElement>()
    const bottomTrap = ref<HTMLElement>()

    let showing = false
    let prevFocusedEl: HTMLElement | null = null

    const transferTo = computed(() => {
      return props.inner
        ? ''
        : typeof props.transfer === 'boolean'
          ? props.transfer
            ? 'body'
            : ''
          : props.transfer
    })
    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('inherit')]: transferTo.value !== 'body' && props.inherit,
          [nh.bm('inner')]: props.inner,
          [nh.bm('disabled')]: props.disabled
        }
      ]
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

        if (prevFocusedEl) {
          prevFocusedEl.focus()
          prevFocusedEl = null
        }
      } else {
        prevFocusedEl = document.activeElement as HTMLElement
        zIndex.value = getIndex()
      }

      if (!props.maskTransition) {
        value ? afterOpen() : afterClose()
      }
    })
    watch(
      [() => props.permeable, wrapper],
      () => {
        if (wrapper.value) {
          wrapper.value.removeEventListener('wheel', disableWheel)

          if (!props.permeable) {
            wrapper.value.addEventListener('wheel', disableWheel)
          }
        }
      },
      { immediate: true, flush: 'post' }
    )

    function disableWheel(event: WheelEvent) {
      event.preventDefault()
      event.stopPropagation()
    }

    function toggleActive(active: boolean) {
      if (currentActive.value === active) return

      currentActive.value = active

      emit('update:active', active)
      emitEvent(props.onToggle, active)
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
      const activeEl = document && document.activeElement

      if (!activeEl || !wrapper.value || !wrapper.value.contains(activeEl)) {
        topTrap.value?.focus()
      }

      nextTick(() => {
        showing = true
        emitEvent(props.onShow)
      })
    }

    function handleMaskClick(event: MouseEvent) {
      emitEvent(props.onMaskClick, event)
      handleClose()
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

    function handleResize(entry: ResizeObserverEntry) {
      emitEvent(props.onResize, entry)
    }

    return {
      props,
      nh,
      currentActive,
      zIndex,
      wrapShow,

      className,
      transferTo,

      wrapper,
      topTrap,
      bottomTrap,

      handleClose,
      afterClose,
      afterOpen,
      handleMaskClick,
      handleFocusIn,
      handleResize
    }
  }
})
</script>
