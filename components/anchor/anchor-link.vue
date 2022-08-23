<template>
  <li :class="nh.be('item')">
    <a
      ref="link"
      :class="linkClass"
      :href="to"
      :style="linkStyle"
      :title="title"
      @click.prevent="handleSelect"
    >
      <slot></slot>
    </a>
    <ul v-if="$slots.group" :class="nh.be('list')">
      <slot name="group"></slot>
    </ul>
  </li>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  provide,
  inject,
  onMounted,
  onBeforeUnmount,
  toRef
} from 'vue'
import { useNameHelper } from '@vexip-ui/config'
import { baseIndentWidth, LINK_STATE, ANCHOR_STATE } from './symbol'

import type { LinkState } from './symbol'

export default defineComponent({
  name: 'AnchorLink',
  props: {
    to: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const anchorState = inject(ANCHOR_STATE, null)
    const parentLinkState = inject(LINK_STATE, null)

    const nh = useNameHelper('anchor')
    const indent = ref(parentLinkState?.indent ? parentLinkState?.indent + 1 : 1)
    const active = ref(false)

    const link = ref<HTMLElement | null>(null)

    const state = reactive({
      el: link,
      to: toRef(props, 'to'),
      active,
      indent
    })

    const linkClass = computed(() => {
      return {
        [nh.be('link')]: true,
        [nh.bem('link', 'active')]: state.active
      }
    })
    const linkStyle = computed(() => {
      return {
        paddingLeft: `${baseIndentWidth * indent.value}px`
      }
    })

    provide<LinkState>(LINK_STATE, state)

    if (anchorState) {
      watch(
        () => anchorState.currentActive,
        value => {
          active.value = value === props.to
        }
      )

      onMounted(() => {
        anchorState.increaseLink(state)
      })

      onBeforeUnmount(() => {
        anchorState.decreaseLink(state)
      })
    }

    function handleSelect() {
      if (anchorState) {
        anchorState.handleActive(props.to)
      }
    }

    return {
      nh,

      linkClass,
      linkStyle,

      link,

      handleSelect
    }
  }
})
</script>
