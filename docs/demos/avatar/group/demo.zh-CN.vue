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
  { src: '/qmhc.jpg' },
  { icon: User },
  { text: 'Qmhc' },
  { src: 'https://joeschmoe.io/api/v1/random' },
  { src: 'https://joeschmoe.io/api/v1/random' }
]
</script>
