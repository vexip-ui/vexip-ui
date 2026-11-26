<template>
  <RadioGroup v-model:value="fit">
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
  </RadioGroup>
  <br />
  <br />
  <div class="demo-window">
    <ObjectFit :width="420" :height="300" :fit="fit">
      <Card title="标题" shadow="never" style="width: 420px; height: 300px"></Card>
    </ObjectFit>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ObjectFit } from 'vexip-ui'

const fit = ref<'none' | 'contain' | 'cover' | 'fill' | 'scale-down'>('contain')

const items = ['none', 'contain', 'cover', 'fill', 'scale-down']
</script>

<style scoped>
.demo-window {
  position: relative;
  box-sizing: border-box;
  width: 500px;
  min-width: 100px;
  max-width: 1000px;
  height: 500px;
  min-height: 100px;
  max-height: 1000px;
  overflow: auto;
  color: #000;
  resize: both;
  scrollbar-width: none;
  background-color: #eee;
}

.demo-window::-webkit-scrollbar {
  display: none;
}
</style>
