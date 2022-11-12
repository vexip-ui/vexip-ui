<script setup lang="ts">
import { FullScreen } from 'vexip-ui'
import { ref } from 'vue'
import type { FullScreenType, FullScreenInstance } from 'vexip-ui/components/full-screen'

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
      <Button type="primary" @click="enter()">
        enter
      </Button>
      <Button type="primary" @click="exit()">
        exit
      </Button>
    </div>

    <div style="margin-top: 20px;">
      ref
      <Button type="primary" @click="fullScreen!.enter()">
        enter
      </Button>
      <Button type="primary" @click="fullScreen!.exit()">
        exit
      </Button>
    </div>
  </FullScreen>
</template>
