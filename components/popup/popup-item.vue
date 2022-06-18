<template>
  <transition appear :name="transitionName" @after-leave="handleDelete(state.key)">
    <div
      v-show="state.visible"
      ref="wrapper"
      :class="nh.be('item')"
      :style="{ zIndex: state.zIndex }"
      :vxp-index="state.key"
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
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, inject, onMounted, nextTick } from 'vue'
import { Renderer } from '@/components/renderer'
import { useNameHelper } from '@vexip-ui/config'
import { noop } from '@vexip-ui/utils'
import { DELETE_HANDLER } from './symbol'

import type { PropType } from 'vue'
import type { ClassType, PopupItemState } from './symbol'

export default defineComponent({
  name: 'PopupItem',
  components: {
    Renderer
  },
  props: {
    state: {
      type: Object as PropType<PopupItemState>,
      default: () => ({})
    },
    transitionName: {
      type: String,
      default: 'vxp-popup-top'
    },
    innerClass: {
      type: [String, Object] as PropType<ClassType>,
      default: null
    }
  },
  setup(props) {
    const handleDelete = inject(DELETE_HANDLER, noop)

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
      nh: useNameHelper('popup'),

      wrapper,

      handleDelete
    }
  }
})
</script>
