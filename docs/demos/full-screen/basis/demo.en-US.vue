<template>
  <FullScreen ref="fullScreen" v-slot="{ toggle }" style="background-color: white;">
    <div style="position: relative; border: 1px solid red;">
      <p>I am FullScreen Content</p>
      <div>
        <Button @click="toggle('window')">
          Window
        </Button>
        <Button @click="toggle('browser')">
          Browser
        </Button>
      </div>
    </div>
  </FullScreen>
</template>

<script setup lang="ts">
import { FullScreen } from 'vexip-ui'
</script>
