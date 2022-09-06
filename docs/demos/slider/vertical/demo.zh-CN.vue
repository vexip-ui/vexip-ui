<template>
  <div style="height: 200px;">
    <Slider v-model:value="value" vertical></Slider>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(40)
</script>
