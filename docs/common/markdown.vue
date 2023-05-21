<template>
  <div class="markdown">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'

import { useMounted } from '@vexip-ui/hooks'

import type { PropType } from 'vue'

const props = defineProps({
  frontmatter: {
    type: Object,
    default: () => ({})
  },
  onMounted: {
    type: Function as PropType<() => any>,
    default: null
  }
})

const { isMounted } = useMounted()

watch(isMounted, value => {
  if (value && typeof props.onMounted === 'function') {
    props.onMounted()
  }
})
</script>

<style lang="scss">
@use '../style/mixins.scss' as *;

.markdown {
  pre {
    margin: 14px 0;
  }

  :not(pre) > code {
    padding: 3px 5px;
    font-family: SFMono-Regular, Consolas, Monaco, 'andale mono', 'ubuntu mono', monospace;
    background-color: var(--vxp-fill-color-background);
    border-radius: var(--vxp-border-radius-small);
    transition: var(--vxp-transition-background);
  }

  p {
    margin: 14px 0;
  }

  blockquote {
    padding: 3px 10px;
    margin: 14px 0;
    font-size: 90%;
    color: var(--vxp-content-color-secondary);
    border-left: 4px solid var(--vxp-border-color-base);

    p {
      margin: 0;
    }

    :not(pre) > code {
      color: var(--vxp-content-color-secondary);
      background-color: var(--vxp-fill-color-background);
    }
  }

  .vxp-alert {
    margin: 2em 0;

    p {
      margin: 0;
    }
  }

  a {
    color: var(--vxp-color-primary-light-1);
    text-decoration: none;
  }

  ul {
    padding-left: 4px;

    & > li {
      padding: 2px 4px;
      margin-left: 20px;
      list-style-type: circle;
    }
  }

  table {
    min-width: 100%;
    font-family: Consolas, Monaco, 'andale mono', 'ubuntu mono', monospace;
    font-size: var(--vxp-font-size-secondary);
    border-spacing: 0;
    border-collapse: collapse;

    th,
    td {
      padding: 10px 16px;
      border: var(--vxp-border-light-2);
    }

    th {
      text-align: left;
      white-space: normal;
      background-color: var(--vxp-color-primary-opacity-9);
    }
  }

  .md-table {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 28px;
    overflow-x: auto;
  }

  &-body > :last-child {
    margin-bottom: 0;
  }
}
</style>
