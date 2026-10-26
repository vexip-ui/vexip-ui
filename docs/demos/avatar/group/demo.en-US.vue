<template>
  <AvatarGroup :options="options" :offset="12"></AvatarGroup>
  <br />
  <br />
  <AvatarGroup :options="options" :max="3" circle></AvatarGroup>
  <br />
  <br />
  <AvatarGroup
    :options="options"
    :max="3"
    circle
    :size="44"
    show-tip
  ></AvatarGroup>
</template>

<script setup lang="ts">
import { User } from '@vexip-ui/icons'

const options = [
  { src: 'https://www.vexipui.com/qmhc.jpg' },
  { icon: User },
  { text: 'Qmhc' },
  { text: 'Tom' },
  { text: 'Ken' },
]
</script>
