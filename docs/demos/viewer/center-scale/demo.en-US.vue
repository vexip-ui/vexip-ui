<template>
  <p>
    Scale from center:
    <Switch v-model:value="centerScale"></Switch>
  </p>
  <Viewer width="1000" height="500" :center-scale="centerScale">
    <img src="https://www.vexipui.com/picture-1.jpg" />
  </Viewer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const centerScale = ref(false)
</script>
