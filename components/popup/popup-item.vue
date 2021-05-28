<template>
  <transition appear :name="transitionName" @after-leave="handleDelete(state.key)">
    <div
      v-show="state.visible"
      ref="wrapper"
      :class="`${prefix}__item`"
      :style="{ zIndex: state.zIndex }"
      :vxp-index="state.key"
    >
      <div :class="[`${prefix}__item-inner`, innerClass]">
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
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, inject, onMounted, nextTick } from 'vue'
import { Renderer } from '@/components/renderer'
import { noop } from '@/common/utils/common'
import { DELETE_HANDLER } from './symbol'

import type { PropType } from 'vue'
import type { Key, ClassType, PopupItemState } from './symbol'

const props = {
  state: {
    type: Object as PropType<PopupItemState>,
    required: true
  },
  transitionName: {
    type: String,
    default: 'vxp-popup-top'
  },
  innerClass: {
    type: [String, Object] as PropType<ClassType>,
    default: null
  }
}

export default defineComponent({
  name: 'PopupItem',
  components: {
    Renderer
  },
  props,
  setup(props) {
    const handleDelete = inject<(key: Key) => void>(DELETE_HANDLER, noop)

    const wrapper = ref<HTMLElement | null>(null)

    onMounted(() => {
      nextTick(() => {
        const state = props.state

        if (state && wrapper.value) {
          state.height = wrapper.value.offsetHeight
        }
      })
    })

    return {
      prefix: 'vxp-popup',

      wrapper,

      handleDelete
    }
  }
})
</script>
