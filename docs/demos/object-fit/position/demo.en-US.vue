<template>
  <RadioGroup v-model:value="fit">
    <span style="margin-inline-end: 10px">Fit:</span>
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
    <Checkbox v-model:checked="scaleDisabled">
      Scale:
    </Checkbox>
  </RadioGroup>
  <br /><br />
  Position: <Input v-model:value="position" class="demo-position"></Input>
  <br />
  <Dropdown class="demo-presets">
    <Button type="primary">
      Position presets
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
      :scale-disabled="scaleDisabled"
      :position="position"
    >
      <Card
        title="Title"
        shadow="never"
        :style="{ width: fixedWidth + 'px', height: fixedHeight + 'px' }"
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
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
const scaleDisabled = ref(false)
const position = ref('center center')
const fit = ref<'none' | 'contain' | 'cover' | 'fill' | 'scale-down'>('contain')

const items = ['none', 'contain', 'cover', 'fill', 'scale-down']
const presets = [
  { label: 'Center', value: 'center center' },
  { label: 'Left top', value: 'left top' },
  { label: 'Center top', value: 'center top' },
  { label: 'Right top', value: 'right top' },
  { label: 'Left center', value: 'left center' },
  { label: 'Right center', value: 'right center' },
  { label: 'Left bottom', value: 'left bottom' },
  { label: 'Center bottom', value: 'center bottom' },
  { label: 'Right bottom', value: 'right bottom' },
  { label: 'Offset 5em 100px', value: '5em 100px' },
  { label: 'Offset right 10px', value: 'right 10px' },
  { label: 'Edge offset left 10% top 20%', value: 'left 10% top 20%' },
  { label: 'Edge offset right 10% bottom 20%', value: 'right 10% bottom 20%' },
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
