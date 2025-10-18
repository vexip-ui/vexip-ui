<template>
  <RadioGroup v-model:value="fit">
    <span style="margin-inline-end: 10px">Fit:</span>
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
    <Checkbox v-model:checked="checked">
      缩放：
    </Checkbox>
  </RadioGroup>
  <br /><br />
  Position: <Input v-model:value="position" class="demo-position"></Input>
  <br />
  <Dropdown class="demo-presets">
    <Button type="primary">
      Position 预设
    </Button>
    <template #drop>
      <DropdownList>
        <DropdownItem
          v-for="preset in presets"
          :key="preset.value"
          :name="preset.value"
          @click="position = preset.value"
        >
          {{ preset.label }}
        </DropdownItem>
      </DropdownList>
    </template>
  </Dropdown>
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
      :is-scale="checked"
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
import { Button, Dropdown, DropdownItem, DropdownList, Input, ObjectFit } from 'vexip-ui'

const fixedWidth = 420
const fixedHeight = 300
const checked = ref(true)
const position = ref('center center')
const fit = ref<'none' | 'contain' | 'cover' | 'fill' | 'scale-down'>('contain')

const items = ['none', 'contain', 'cover', 'fill', 'scale-down']
const presets = [
  { label: '居中 center', value: 'center center' },
  { label: '左上', value: 'left top' },
  { label: '中上', value: 'center top' },
  { label: '右上', value: 'right top' },
  { label: '左中', value: 'left center' },
  { label: '右中', value: 'right center' },
  { label: '左下', value: 'left bottom' },
  { label: '中下', value: 'center bottom' },
  { label: '右下', value: 'right bottom' },
  { label: '距离偏移 5em 100px', value: '5em 100px' },
  { label: '距离偏移 right 10px', value: 'right 10px' },
  { label: '边缘偏移 left 10% top 20%', value: 'left 10% top 20%' },
  { label: '边缘偏移 right 10% bottom 20%', value: 'right 10% bottom 20%' },
]
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

.demo-position {
  width: 200px;
  margin-left: 1rem;
}

.demo-presets {
  margin-top: 1rem;
  margin-left: 1rem;
}

:deep(.vxp-object-fit__scale) {
  background-color: var(--vxp-color-primary-light-6);
}
</style>
