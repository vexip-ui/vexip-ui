<template>
  <Avatar
    src="unknown.jpg"
    fallback-src="https://www.vexipui.com/qmhc.jpg"
    @error="handleError"
  ></Avatar>
</template>

<script setup lang="ts">
function handleError() {
  console.info('avatar load error')
}
</script>
