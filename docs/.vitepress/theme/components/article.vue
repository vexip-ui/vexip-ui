<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import { useData, useRoute } from 'vitepress'
import { debounceFrame } from '@vexip-ui/utils'
import { ussTocAnchor } from '../common/toc-anchor'

import PageFooter from './page-footer.vue'

import type { RowExposed } from 'vexip-ui'

const props = defineProps({
  anchorLevel: {
    type: Number,
    default: null
  },
  active: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:active', 'resize'])

const { frontmatter } = useData()
const route = useRoute()

const wrapper = ref<RowExposed>()
const wrapperEl = computed(() => wrapper.value?.$el)

const currentActive = ref(props.active)
const { anchors, refreshAnchor } = ussTocAnchor(
  frontmatter.value.anchor || props.anchorLevel || 3,
  wrapperEl
)

const refresh = debounceFrame(() => {
  refreshAnchor(frontmatter.value.anchor || props.anchorLevel || 3)
})

const contentHeight = ref(1000)

const contentStyle = computed(() => ({
  height: `${contentHeight.value}px`,
  paddingTop: '80px',
  paddingInlineStart: '50px',
  marginInlineEnd: '-50px'
}))

watch(
  () => props.active,
  value => {
    currentActive.value = value
  }
)
watch(currentActive, value => {
  emit('update:active', value)
})
watch([() => props.anchorLevel, () => frontmatter.value.anchor, () => route.path], refresh)

onMounted(refresh)

function handleContentResize(entry: ResizeObserverEntry) {
  const box = entry.borderBoxSize?.[0]

  if (box) {
    contentHeight.value = box.blockSize
  } else {
    contentHeight.value = entry.contentRect.height
  }
}
</script>

<template>
  <Row ref="wrapper" tag="article" class="article">
    <ResizeObserver throttle @resize="handleContentResize">
      <Column flex="auto" style="min-width: 0">
        <slot></slot>
        <PageFooter class="article__footer"></PageFooter>
      </Column>
    </ResizeObserver>
    <Column class="article__aside" flex="calc(var(--anchor-width) + 50px)" :style="contentStyle">
      <Anchor
        v-model:active="currentActive"
        class="toc-anchor"
        :offset="15"
        bind-hash
        viewer="window"
        :style="{ visibility: !loading ? undefined : 'hidden' }"
      >
        <AnchorLink v-for="item in anchors" :key="item.id" :to="`#${item.id}`">
          {{ item.name }}
        </AnchorLink>
      </Anchor>
    </Column>
  </Row>
</template>

<style lang="scss">
@use '../style/mixins.scss' as *;

.article {
  position: relative;
  z-index: 0;
  flex-wrap: nowrap;
  min-height: calc(var(--vxp-layout-view-height) - var(--vxp-layout-header-height));
  padding: calc(var(--sub-header-height) + 16px) 30px 30px;

  @include query-media('lg') {
    padding: 16px 30px 30px;
  }

  @include query-media('xl') {
    padding: 16px 60px 60px;
  }

  &__aside {
    display: none;

    @include query-media('xl') {
      display: var(--vxp-column-display);
    }
  }

  &__footer {
    margin-top: 30px;
  }

  .toc-anchor {
    position: sticky;
    top: calc(40px + var(--header-height));
    inset-inline-end: 10px;
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

  h1 > .vxp-tag {
    margin-inline-start: 8px;
  }

  .md-table {
    th:nth-child(1),
    td:nth-child(1) {
      white-space: nowrap;
    }

    s {
      color: var(--vxp-color-error-opacity-1);
    }
  }
}
</style>
