<template>
  <div>
    <p>这是常规的模版内容</p>
    <Renderer :renderer="renderMessage" :data="{ message: msg }"></Renderer>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'

const msg = ref('一些内容')

function renderMessage({ message }: { message: string }) {
  return h('p', [
    '这是用渲染函数渲染的',
    h(
      'span',
      {
        style: 'color: red'
      },
      [message]
    )
  ])
}
</script>
