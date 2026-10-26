<template>
  <Renderer v-slot="{ message }" :data="{ message: add(msg1, msg2) }">
    Use many times:
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

const msg1 = ref('Some content')
const msg2 = ref('Other content')

function add(left: string, right: string) {
  return `${left} + ${right}`
}
</script>
