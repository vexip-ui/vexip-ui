<template>
  <article ref="wrapper" class="article">
    <slot></slot>
    <Portal to="#toc-anchor">
      <Anchor
        v-model:active="currentActive"
        :offset="15"
        bind-hash
        :style="{ visibility: !loading ? undefined : 'hidden' }"
      >
        <AnchorLink v-for="item in anchors" :key="item.id" :to="`#${item.id}`">
          {{ item.name }}
        </AnchorLink>
      </Anchor>
    </Portal>
  </article>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ussTocAnchor } from './toc-anchor'

import type { PropType } from 'vue'

const props = defineProps({
  active: {
    type: String,
    default: ''
  },
  anchorLevel: {
    type: Number as PropType<2 | 3>,
    default: 2
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:active'])

const currentActive = ref(props.active)
const { anchors, wrapper, refreshAnchor } = ussTocAnchor(props.anchorLevel || 3)

watch(
  () => props.active,
  value => {
    currentActive.value = value
  }
)
watch(
  () => props.anchorLevel,
  value => {
    refreshAnchor(value)
  }
)
watch(currentActive, value => {
  emit('update:active', value)
})

defineExpose({ refreshAnchor })
</script>

<style lang="scss">
@use '../style/mixins.scss' as *;

.article {
  position: relative;
  padding: 16px 30px 30px;

  @include query-media('lg') {
    padding: 16px 60px 60px;
  }

  @include query-media('xl') {
    padding-right: calc(var(--anchor-width) + 50px);
  }
}
</style>
