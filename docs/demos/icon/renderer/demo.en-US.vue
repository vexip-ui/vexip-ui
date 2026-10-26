<template>
  <Icon :scale="1.5" :renderer="renderIcon"></Icon>
</template>

<script setup lang="ts">
import { h } from 'vue'

import type { IconRenderer } from 'vexip-ui'

const renderIcon: IconRenderer = (props, attrs) => {
  return h('div', {
    ...attrs,
    class: 'my-icon',
    style: props.size || (String(props.scale) !== '1' ? `font-size: ${props.scale}em` : ''),
  })
}
</script>

<style scoped>
.my-icon {
  width: 1em;
  height: 1em;
  background: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 32 32' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='%23f9ad00' d='M30 10.75h-8.749V2H30Zm-9.626 0h-8.75V2h8.75Zm-9.625 0H2V2h8.749ZM30 20.375h-8.749v-8.75H30Z'/%3E%3Cpath fill='%234e4e4e' d='M20.374 20.375h-8.75v-8.75h8.75Zm0 9.625h-8.75v-8.75h8.75ZM30 30h-8.749v-8.75H30Zm-19.251 0H2v-8.75h8.749Z'/%3E%3C/svg%3E");
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
