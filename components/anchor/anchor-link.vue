<script setup lang="ts">
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  toRef,
  watch
} from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { anchorLinkProps } from './props'
import { ANCHOR_STATE, LINK_STATE, baseIndentWidth } from './symbol'

defineOptions({ name: 'AnchorLink' })

const props = defineProps(anchorLinkProps)

const anchorState = inject(ANCHOR_STATE, null)
const parentLinkState = inject(LINK_STATE, null)

const nh = useNameHelper('anchor')
const indent = ref(parentLinkState?.indent ? parentLinkState?.indent + 1 : 1)
const active = ref(false)

const link = ref<HTMLElement>()

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
    paddingInlineStart: `${baseIndentWidth * indent.value}px`
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

  return false
}
</script>

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
    <ul v-if="$slots.group || (children && children.length)" :class="nh.be('list')">
      <slot name="group">
        <template v-if="children && children.length">
          <AnchorLink
            v-for="child in children"
            :key="child.to"
            :to="child.to"
            :title="child.title"
            :children="child.children"
          >
            {{ child.label }}
          </AnchorLink>
        </template>
      </slot>
    </ul>
  </li>
</template>
