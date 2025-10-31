<template>
  <RadioGroup v-model:value="fit">
    <span style="margin-inline-end: 10px">Fit:</span>
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
    <Checkbox v-model:checked="scaleDisabled">
      禁用缩放：
    </Checkbox>
  </RadioGroup>
  <br /><br />
  <div
    class="demo-window"
    :style="{
      position: 'relative',
    }"
  >
    <ObjectFit
      :width="fixedWidth"
      :height="fixedHeight"
      :fit="fit"
      :scale-disabled="scaleDisabled"
    >
      <Card
        title="标题"
        shadow="never"
        :style="{ width: fixedWidth + 'px', height: fixedHeight + 'px' }"
      >
        <p>卡片的内容</p>
        <p>卡片的内容</p>
        <p>卡片的内容</p>
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
    </ObjectFit>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, ObjectFit } from 'vexip-ui'

const fixedWidth = 420
const fixedHeight = 300
const scaleDisabled = ref(true)
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
  background-color: #eee;
  scrollbar-width: none;
}

.demo-window::-webkit-scrollbar {
  display: none;
}

/* 背景色-便于观察缩放后的区域 */
:deep(.vxp-object-fit__scale) {
  background-color: var(--vxp-color-primary-light-6);
}
</style>
