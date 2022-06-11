<template>
  <div class="markdown">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useMounted } from '@vexip-ui/mixins'

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
.markdown {
  pre {
    margin: 14px 0;
    background-color: var(--vxp-fill-color-background);
    border-radius: 2px;
  }

  :not(pre) > code {
    padding: 3px 5px;
    font-family: SFMono-Regular, Consolas, Monaco, 'andale mono', 'ubuntu mono', monospace;
    background-color: var(--vxp-fill-color-background);
    border-radius: var(--vxp-border-radius-small);
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
    width: 100%;
    margin-top: 10px;
    margin-bottom: 2em;
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
      white-space: nowrap;
      background-color: var(--vxp-color-primary-opacity-9);
    }

    // tr:nth-child(2n) {
    //   background-color: rgba(var(--vxp-color-primary-light-9) / 50%);
    // }
  }
}
</style>
