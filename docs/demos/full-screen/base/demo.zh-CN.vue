<script setup lang="ts">
import { FullScreen } from '@/components'
import { ref } from 'vue'
import type { FullScreenType, FullScreenInstance } from '@/components/full-screen'

const fullScreen = ref<FullScreenInstance | null>(null)

const options: FullScreenType[] = ['window', 'browser']

const type = ref<FullScreenType>(options[0])
</script>

<template>
  <p>当前FullScreen类型: {{ type }}</p>
  <Select v-model:value="type" :options="options"></Select>
  <FullScreen
    v-slot="{ enter, exit }"
    ref="fullScreen"
    :type="type"
    style="background-color: white;"
  >
    <div style="margin-top: 20px;">
      slots
      <button @click="enter()">
        enter
      </button>
      <button @click="exit()">
        exit
      </button>
    </div>

    <div style="margin-top: 20px;">
      ref
      <button @click="fullScreen!.enter()">
        enter
      </button>
      <button @click="fullScreen!.exit()">
        exit
      </button>
    </div>
  </FullScreen>
</template>
