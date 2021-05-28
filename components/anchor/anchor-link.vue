<template>
  <li :class="`${prefix}__item`">
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
    <ul :class="`${prefix}__list`">
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
import { baseIndentWidth, LINK_STATE, ANCHOR_STATE } from './symbol'

import type { LinkState, AnchorState } from './symbol'

const props = {
  to: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
}

export default defineComponent({
  name: 'AnchorLink',
  props,
  setup(props) {
    const anchorState = inject<AnchorState | null>(ANCHOR_STATE, null)
    const parentLinkState = inject<LinkState | null>(LINK_STATE, null)

    const prefix = 'vxp-anchor'
    const indent = ref(parentLinkState?.indent ? parentLinkState?.indent + 1 : 1)
    const active = ref(false)

    const link = ref<HTMLElement | null>(null)

    const state = reactive({
      el: link,
      to: toRef(props, 'to'),
      indent
    })

    const linkClass = computed(() => {
      return {
        [`${prefix}__link`]: true,
        [`${prefix}__link--active`]: active.value
      }
    })
    const linkStyle = computed(() => {
      return {
        paddingLeft: `${baseIndentWidth * indent.value}px`
      }
    })

    provide(LINK_STATE, state)

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
      prefix,

      linkClass,
      linkStyle,

      link,

      handleSelect
    }
  }
})
</script>
