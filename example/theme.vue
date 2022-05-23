<template>
  <Grid class="theme-view">
    <Cell :width="12">
      <template v-for="(meta, index) in buttonMeta" :key="index">
        <div
          :style="{
            padding: meta.ghost ? 'var(--ghost-padding)' : '0',
            backgroundColor: meta.ghost ? 'var(--ghost-bg-color)' : undefined
          }"
        >
          <template v-for="(type) in buttonTypes" :key="type">
            <Button
              :type="type"
              :simple="meta.simple"
              :ghost="meta.ghost"
              :disabled="meta.disabled"
              :icon="Upload"
            >
              {{ type.charAt(0).toLocaleLowerCase() + type.substring(1) }}
            </Button>
          </template>
        </div>
        <br />
      </template>
      <template v-for="(meta, index) in tagMeta" :key="index">
        <Tag
          v-for="(type) in tagTypes"
          :key="type"
          closable
          circle
          :type="type"
          :border="meta.border"
          :simple="meta.simple"
        >
          标签
        </Tag>
        <br />
        <br />
      </template>
      <template v-for="state in states" :key="state">
        <Input :state="state" style="margin-right: 20px;"></Input>
        <NumberInput :state="state"></NumberInput>
        <br />
        <br />
      </template>
      <Input disabled style="margin-right: 20px;"></Input>
      <NumberInput disabled></NumberInput>
      <br />
      <br />
      <template v-for="state in states" :key="state">
        <Select :options="options" :state="state" style="margin-right: 20px;"></Select>
        <AutoComplete :options="options" :state="state"></AutoComplete>
        <br />
        <br />
      </template>
      <Select :options="options" disabled style="margin-right: 20px;"></Select>
      <AutoComplete :options="options" disabled></AutoComplete>
      <br />
      <br />
      <template v-for="state in states" :key="state">
        <CheckboxGroup :values="[checkItems[0], checkItems[4]]">
          <Checkbox
            v-for="(item, index) in checkItems"
            :key="item"
            :state="state"
            :label="item"
            :disabled="index === 3 || index === 4"
            :control="index === 1"
            :partial="index === 1"
          ></Checkbox>
        </CheckboxGroup>
        <br />
      </template>
      <template v-for="(state, idx) in states" :key="state">
        <RadioGroup :value="checkItems[idx]">
          <Radio
            v-for="(item, index) in checkItems"
            :key="item"
            :state="state"
            :label="item"
            :disabled="index === 2 || index === 3"
          ></Radio>
        </RadioGroup>
        <br />
      </template>
      <br />
      <template v-for="state in states" :key="state">
        <Switcher :state="state"></Switcher>
        <Switcher :state="state" open-text="打开" close-text="关闭"></Switcher>
        <Switcher :state="state" disabled></Switcher>
        <Switcher
          :state="state"
          disabled
          open-text="打开"
          close-text="关闭"
        ></Switcher>
      </template>
      <br />
      <br />
      <DatePicker
        is-range
        clearable
        transfer
        type="datetime"
        :shortcuts="dateShortcuts"
      ></DatePicker>
      <br />
      <br />
      <TimePicker
        is-range
        clearable
        :shortcuts="timeShortcuts"
      ></TimePicker>
      <br />
      <br />
      <template v-for="(meta, index) in linkerMeta" :key="index">
        <template v-for="(type) in linkerTypes" :key="type">
          <Linker
            :type="type"
            :disabled="meta.disabled"
            :underline="meta.underline"
            :icon="meta.icon"
          >
            链接
          </Linker>
        </template>
        <br />
      </template>
      <br />
      <template v-for="state in states" :key="state">
        <Slider :state="state" :value="20 + Math.random() * 40"></Slider>
      </template>
      <br />
      <template v-for="state in states" :key="state">
        <Textarea :state="state" :max-length="100"></Textarea>
        <br />
        <br />
      </template>
      <Textarea disabled :max-length="100"></Textarea>
      <br />
      <br />
    </Cell>
    <Cell :width="12">
      <TabNav>
        <TabNavItem
          v-for="meta in tabMeta"
          :key="meta.label"
          :label="meta.label"
          :disabled="meta.disabled"
          :icon="meta.icon"
        >
          {{ meta.label }}
        </TabNavItem>
      </TabNav>
      <TabNav card>
        <TabNavItem
          v-for="meta in tabMeta"
          :key="meta.label"
          :label="meta.label"
          :disabled="meta.disabled"
          :icon="meta.icon"
        >
          {{ meta.label }}
        </TabNavItem>
      </TabNav>
      <template v-for="(type) in alertTypes" :key="type">
        <Alert icon closable :type="type">
          警告提示的内容
        </Alert>
      </template>
      <template v-for="n in 2" :key="n">
        <Breadcrumb :border="n === 2" style="max-width: 500px; margin-bottom: 10px;">
          <BreadcrumbItem>此电脑</BreadcrumbItem>
          <BreadcrumbItem>文档 (D:)</BreadcrumbItem>
          <BreadcrumbItem>vexip-ui</BreadcrumbItem>
        </Breadcrumb>
      </template>
      <div style="display: flex;">
        <template v-for="n in 2" :key="n">
          <Menu :theme="n === 1 ? 'light' : 'dark'" style="width: 240px; margin-right: 20px;">
            <MenuItem
              v-for="meta in menuMeta"
              :key="meta.label"
              :label="meta.label"
              :icon="Upload"
              :disabled="meta.disabled"
            >
              {{ meta.label }}
            </MenuItem>
          </Menu>
        </template>
      </div>
      <br />
      <template v-for="(meta, index) in messageMeta" :key="index">
        <span style="padding: 0 10px;">
          Color({{ meta.color ? '√' : '×' }}) Background({{ meta.background ? '√' : '×' }})
        </span>
        <Button
          v-for="(type) in messageTypes"
          :key="type.type"
          :type="type.type"
          @on-click="Message[type.type]({ ...messageOptions, color: meta.color, background: meta.background })"
        >
          {{ `${type.prefix}消息` }}
        </Button>
        <br />
        <br />
      </template>
      <template v-for="(meta, index) in messageMeta" :key="index">
        <span style="padding: 0 10px;">
          Color({{ meta.color ? '√' : '×' }}) Background({{ meta.background ? '√' : '×' }})
        </span>
        <Button
          v-for="(type) in messageTypes"
          :key="type.type"
          :type="type.type"
          @on-click="Notice[type.type]({ ...messageOptions, color: meta.color, background: meta.background })"
        >
          {{ `${type.prefix}提醒` }}
        </Button>
        <br />
        <br />
      </template>
    </Cell>
  </Grid>
</template>

<script setup lang="ts">
import { Message, Notice } from '../components'
import { Upload } from '@vexip-ui/icons'

const buttonTypes = ['default', 'primary', 'dashed', 'text', 'info', 'success', 'warning', 'error'] as const
const buttonMeta = [
  { ghost: false, simple: false, disabled: false },
  { ghost: false, simple: false, disabled: true },
  { ghost: false, simple: true, disabled: false },
  { ghost: false, simple: true, disabled: true },
  { ghost: true, simple: false, disabled: false },
  { ghost: true, simple: false, disabled: true }
]

const tagTypes = [
  'default',
  'primary',
  'info',
  'success',
  'error',
  'warning',
  'lime',
  'pink',
  'magenta',
  'tomato',
  'orange',
  'cyan',
  'navy',
  'gold',
  'purple'
] as const
const tagMeta = [
  { border: false, simple: false },
  { border: true, simple: false },
  { border: false, simple: true }
]

const states = ['default', 'success', 'error', 'warning'] as const
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3, disabled: true },
  { label: '选项4', value: 4, disabled: true },
  { label: '选项5', value: 5, divided: true },
  { label: '选项6', value: 6 },
  { label: '选项7', value: 7 },
  { label: '选项8', value: 8 },
  { label: '选项9', value: 9 },
  { label: '选项10', value: 10 },
  { label: '选项11', value: 11 },
  { label: '选项12', value: 12 }
]

const checkItems = ['北京', '天津', '上海', '广州', '深圳']

const dateShortcuts = [
  { name: 'Current', value: () => Date.now() },
  { name: 'Noon', value: '2022-05-13 12:00:00' }
]

const timeShortcuts = [
  { name: 'Noon', value: '12:00:00' }
]

const linkerTypes = ['default', 'primary', 'success', 'error', 'warning', 'info'] as const
const linkerMeta = [
  { disabled: false, underline: false, icon: null },
  { disabled: true, underline: false, icon: null },
  { disabled: false, underline: true, icon: Upload },
  { disabled: true, underline: false, icon: Upload }
]

const tabMeta = [
  { label: '标签一', icon: null, disabled: false },
  { label: '标签二', icon: null, disabled: false },
  { label: '标签三', icon: null, disabled: true },
  { label: '标签四', icon: Upload, disabled: false },
  { label: '标签五', icon: Upload, disabled: true }
]

const alertTypes = ['default', 'info', 'success', 'warning', 'error'] as const

const menuMeta = [
  { label: '菜单一', disabled: false },
  { label: '菜单二', disabled: false },
  { label: '菜单三', disabled: true },
  { label: '菜单四', disabled: false }
]

const messageTypes = [
  { prefix: '一般', type: 'info' as const },
  { prefix: '成功', type: 'success' as const },
  { prefix: '警告', type: 'warning' as const },
  { prefix: '错误', type: 'error' as const }
]
const messageOptions = {
  title: '提醒标题',
  content: '一条持久的提醒',
  duration: 0,
  closable: true,
  marker: true
}
const messageMeta = [
  { color: false, background: false },
  { color: true, background: false },
  { color: true, background: true }
]
</script>

<style lang="scss">
.theme-view {
  width: 100%;
  height: 100%;

  & > .vxp-cell {
    height: 100%;
    padding: 0 10px;
    overflow-y: auto;
  }
}

.vxp-input-wrapper,
.vxp-select,
.vxp-number-input,
.vxp-date-picker,
.vxp-time-picker {
  width: calc(50% - 20px);
  max-width: 300px;
}

.vxp-date-picker--is-range {
  min-width: 340px;
  max-width: 500px;
}

.vxp-slider,
.vxp-textarea {
  max-width: 500px;
}
</style>
