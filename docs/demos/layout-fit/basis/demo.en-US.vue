<template>
  <RadioGroup v-model:value="fit">
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
  </RadioGroup>
  <br />
  <br />
  <div
    class="demo-window"
    :style="{
      position: 'relative',
      background: '#eee',
    }"
  >
    <LayoutFit
      :width="fixedWidth"
      :height="fixedHeight"
      :fit="fit"
      :is-scale="true"
    >
      <Card
        title="Title"
        shadow="never"
        :style="{ width: fixedWidth + 'px', height: fixedHeight + 'px', background: '#000' }"
      >
        <p>The content of the card</p>
        <p>The content of the card</p>
        <p>The content of the card</p>
        <Button type="primary">
          Primary
        </Button>
        <Button type="error">
          Info
        </Button>
        <Button type="success">
          Success
        </Button>
      </Card>
    </LayoutFit>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LayoutFit } from 'vexip-ui'

const fixedWidth = 420
const fixedHeight = 300

const fit = ref<'none' | 'contain' | 'cover' | 'fill' | 'scale-down'>('contain')

const items = ['none', 'contain', 'cover', 'fill', 'scale-down']
</script>

<style scoped>
.demo-window {
  position: relative;
  box-sizing: border-box;
  width: 300px;
  min-width: 100px;
  max-width: 1000px;
  height: 600px;
  min-height: 100px;
  max-height: 1000px;
  overflow: auto;
  color: #000;
  resize: both;
  background-color: var(--vxp-color-primary-base);
  scrollbar-width: none;
}

.demo-window::-webkit-scrollbar {
  display: none;
}
</style>
