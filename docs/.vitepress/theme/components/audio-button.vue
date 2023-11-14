<script setup lang="ts">
import { ref } from 'vue'

import { HeadphonesSimple } from '@vexip-ui/icons'

const props = defineProps({
  src: {
    type: String,
    default: ''
  }
})

const audio = ref<HTMLAudioElement>()

function handleClick() {
  if (!props.src || !audio.value) return

  audio.value.play()
}
</script>

<template>
  <button type="button" class="audio-button" @click="handleClick">
    <Icon :scale="1.2">
      <HeadphonesSimple></HeadphonesSimple>
    </Icon>
    <audio ref="audio" :src="src"></audio>
  </button>
</template>

<style lang="scss">
.audio-button {
  display: inline-flex;
  padding: 2px;
  margin: 0;
  color: inherit;
  vertical-align: sub;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  outline-color: transparent;
  transition: var(--vxp-transition-color);

  &:hover,
  &:focus {
    color: var(--vxp-color-primary-base);
  }
}
</style>
