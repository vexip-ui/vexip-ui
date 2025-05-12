<template>
  <AvatarGroup
    :options="options"
    :max="3"
    circle
    size="large"
    show-tip
    tip-trigger="click"
    rest-background="orange"
  >
    <template #tip="{ options: rest }">
      <div style="display: flex; flex-direction: column; white-space: nowrap">
        <div v-for="(option, index) in rest" :key="index">
          {{ option.name }}
        </div>
      </div>
    </template>
  </AvatarGroup>
</template>

<script setup lang="ts">
import { User } from '@vexip-ui/icons'

const options = [
  { name: 'User 1', src: 'https://www.vexipui.com/qmhc.jpg' },
  { name: 'User 2', icon: User },
  { name: 'User 3', text: 'Qmhc' },
  { name: 'User 4', text: 'Qmhc' },
  { name: 'User 5', text: 'Qmhc' },
]
</script>
