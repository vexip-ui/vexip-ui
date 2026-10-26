<template>
  <div>
    <p>This is the normal template content</p>
    <Renderer :renderer="renderMessage" :data="{ message: msg }"></Renderer>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'

const msg = ref('some content')

function renderMessage({ message }: { message: string }) {
  return h('p', [
    'Here are ',
    h(
      'span',
      {
        style: 'color: red',
      },
      [message],
    ),
    ' that using render function',
  ])
}
</script>
