<template>
  <RadioGroup v-model:value="fit">
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
  </RadioGroup>
  <Input v-model:value="position" class="demo-position"></Input>
  <br />
  <br />
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
      :is-scale="true"
      :position="position"
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
import { Input, ObjectFit } from 'vexip-ui'

const fixedWidth = 420
const fixedHeight = 300
const position = ref('50% 50%')
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
  background-color: #eee;
  scrollbar-width: none;
}

.demo-window::-webkit-scrollbar {
  display: none;
}

.demo-position {
  width: 100px;
  margin-left: 1rem;
}
</style>
