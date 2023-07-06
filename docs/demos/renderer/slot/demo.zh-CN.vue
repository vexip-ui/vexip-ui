<template>
  <Renderer v-slot="{ message }" :data="{ message: add(msg1, msg2) }">
    多次使用：
    <p>
      {{ message }}
    </p>
    <p>
      {{ message }}
    </p>
  </Renderer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const msg1 = ref('一些内容')
const msg2 = ref('另一些内容')

function add(left: string, right: string) {
  return `${left} + ${right}`
}
</script>
