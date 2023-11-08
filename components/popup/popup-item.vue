<script setup lang="ts">
import { Renderer } from '@/components/renderer'

import { computed, inject, nextTick, onMounted, ref } from 'vue'

import { classProp, useNameHelper, useZIndex } from '@vexip-ui/config'
import { noop } from '@vexip-ui/utils'
import { DELETE_HANDLER } from './symbol'

import type { PropType } from 'vue'
import type { PopupItemState } from './symbol'

defineOptions({ name: 'PopupItem' })

const props = defineProps({
  state: {
    type: Object as PropType<PopupItemState>,
    default: () => ({})
  },
  transitionName: {
    type: String,
    default: null
  },
  innerClass: {
    type: classProp,
    default: null
  }
})

const emit = defineEmits(['enter', 'leave'])

const handleDelete = inject(DELETE_HANDLER, noop)
const nh = useNameHelper('popup')
const getIndex = useZIndex()

const wrapper = ref<HTMLElement>()

const transition = computed(() => props.transitionName || nh.ns('popup-top'))

onMounted(() => {
  nextTick(() => {
    const state = props.state

    if (state && wrapper.value) {
      state.height = wrapper.value.offsetHeight
    }
  })
})
</script>

<template>
  <Transition appear :name="transition" @after-leave="handleDelete(state.key)">
    <div
      v-show="state.visible"
      ref="wrapper"
      :class="nh.be('item')"
      :style="{ zIndex: getIndex() }"
      :vxp-index="state.key"
      @pointerenter="emit('enter')"
      @pointerleave="emit('leave')"
    >
      <div :class="[nh.be('item-inner'), innerClass]">
        <slot :item="state">
          <Renderer
            v-if="typeof state.renderer === 'function'"
            :renderer="state.renderer"
          ></Renderer>
          <template v-else>
            {{ state.content }}
          </template>
        </slot>
      </div>
    </div>
  </Transition>
</template>
