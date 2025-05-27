<template>
  <Portal :to="props.to">
    <Transition
      :name="props.transition"
      :appear="props.appear"
      @before-enter="emitHookEvent('be', $event)"
      @enter="emitHookEvent('e', $event)"
      @after-enter="emitHookEvent('ae', $event)"
      @enter-cancelled="emitHookEvent('ec', $event)"
      @before-leave="emitHookEvent('bl', $event)"
      @leave="emitHookEvent('l', $event)"
      @after-leave="emitHookEvent('al', $event)"
      @leave-cancelled="emitHookEvent('lc', $event)"
    >
      <div
        v-if="props.alive || props.visible"
        v-show="!props.alive || props.visible"
        ref="wrapper"
        v-bind="$attrs"
        :class="[nh.b(), props.to !== 'body' && nh.bm('inherit')]"
        :role="props.role"
        :style="{ zIndex: props.to && props.visible ? zIndex : undefined }"
      >
        <slot></slot>
      </div>
    </Transition>
  </Portal>
</template>

<script lang="ts">
import { Portal } from '@/components/portal'

import { defineComponent, ref, watch } from 'vue'

import { emitEvent, useNameHelper, useProps, useZIndex } from '@vexip-ui/config'
import { popperProps } from './props'

export default defineComponent({
  name: 'Popper',
  components: {
    Portal,
  },
  inheritAttrs: false,
  props: popperProps,
  emits: [],
  setup(_props) {
    const nh = useNameHelper('popper')
    const props = useProps('popper', _props, {
      visible: false,
      alive: false,
      to: '',
      transition: () => nh.ns('drop'),
      appear: false,
      role: 'dialog',
    })
    const getIndex = useZIndex()

    const zIndex = ref(10)

    const wrapper = ref<HTMLElement>()

    watch(
      () => props.visible,
      value => {
        if (props.to && value) {
          zIndex.value = getIndex()
        }
      },
      { immediate: true },
    )

    function emitHookEvent(name: 'be' | 'e' | 'ae' | 'ec' | 'bl' | 'l' | 'al' | 'lc', el: Element) {
      switch (name) {
        case 'be':
          emitEvent(props.onBeforeEnter, el)
          break
        case 'e':
          emitEvent(props.onEnter, el)
          break
        case 'ae':
          emitEvent(props.onAfterEnter, el)
          break
        case 'ec':
          emitEvent(props.onEnterCancelled, el)
          break
        case 'bl':
          emitEvent(props.onBeforeLeave, el)
          break
        case 'l':
          emitEvent(props.onLeave, el)
          break
        case 'al':
          emitEvent(props.onAfterLeave, el)
          break
        case 'lc':
          emitEvent(props.onLeaveCancelled, el)
          break
      }
    }

    return {
      nh,
      props,
      zIndex,

      wrapper,

      emitHookEvent,
    }
  },
})
</script>
