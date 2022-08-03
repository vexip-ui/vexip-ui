<template>
  <TimeAgo :datetime="datetime" interval title></TimeAgo>
</template>

<script setup lang="ts">
const datetime = Date.now()
</script>
