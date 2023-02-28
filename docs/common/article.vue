<template>
  <Row ref="wrapper" tag="article" class="article">
    <ResizeObserver @resize="handleContentResize">
      <Column flex="auto" style="min-width: 0">
        <slot></slot>
      </Column>
    </ResizeObserver>
    <Column class="article__aside" flex="calc(var(--anchor-width) + 50px)" :style="contentStyle">
      <Anchor
        v-model:active="currentActive"
        class="toc-anchor"
        :offset="15"
        bind-hash
        :style="{ visibility: !loading ? undefined : 'hidden' }"
      >
        <AnchorLink v-for="item in anchors" :key="item.id" :to="`#${item.id}`">
          {{ item.name }}
        </AnchorLink>
      </Anchor>
    </Column>
  </Row>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { ussTocAnchor } from './toc-anchor'

import type { PropType } from 'vue'
import type { RowExposed } from 'vexip-ui'

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

const wrapper = ref<RowExposed>()
const wrapperEl = computed(() => wrapper.value?.$el)

const currentActive = ref(props.active)
const { anchors, refreshAnchor } = ussTocAnchor(props.anchorLevel || 3, wrapperEl)

const contentHeight = ref(1000)

const contentStyle = computed(() => ({
  height: `${contentHeight.value}px`,
  paddingTop: '80px',
  paddingLeft: '50px',
  marginRight: '-50px'
}))

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

if (import.meta.env.DEV) {
  // For HMR
  onMounted(refreshAnchor)
}

function handleContentResize(entry: ResizeObserverEntry) {
  const box = entry.borderBoxSize?.[0]

  if (box) {
    contentHeight.value = box.blockSize
  } else {
    contentHeight.value = entry.contentRect.height
  }
}
</script>

<style lang="scss">
@use '../style/mixins.scss' as *;

.article {
  position: relative;
  flex-wrap: nowrap;
  padding: 16px 30px 30px;

  @include query-media('xl') {
    padding: 16px 60px 60px;
  }

  &__aside {
    display: none;

    @include query-media('xl') {
      display: var(--vxp-column-display);
    }
  }

  .toc-anchor {
    position: sticky;
    top: 40px;
    right: 10px;
    display: none;
    width: var(--anchor-width);

    .vxp-anchor {
      width: 100%;
      font-size: 12px;

      &__link {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    @include query-media('xl') {
      display: block;
    }
  }
}
</style>
