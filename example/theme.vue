<template>
  <Row tag="nav" class="theme-nav" align="middle">
    <h2 style="margin: 0 20px 0 0; pointer-events: none;">
      Theme Playground
    </h2>
    <ThemeSwitch></ThemeSwitch>
  </Row>
  <Split class="theme-view">
    <template #left>
      <NativeScroll height="100%" use-y-bar>
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
                :icon="ArrowUpFromBracket"
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
            Tag
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
          <Switcher :state="state" open-text="Open" close-text="Close"></Switcher>
          <Switcher :state="state" disabled></Switcher>
          <Switcher
            :state="state"
            disabled
            open-text="Open"
            close-text="Close"
          ></Switcher>
          <br />
          <br />
        </template>
        <ColorPicker alpha></ColorPicker>
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
              Address
            </Linker>
          </template>
          <br />
        </template>
        <br />
        <Row
          v-for="(meta, index) in tooltipMeta"
          :key="index"
          :justify="meta.justify"
          style="max-width: 600px; margin: 0 auto 10px;"
        >
          <template v-for="placement in meta.placements" :key="placement">
            <Tooltip theme="dark" :placement="placement" transfer>
              <span style="padding: 0 5px;">
                <Button>{{ placement }}</Button>
              </span>
              <template #tip>
                {{ `The ${placement.split('-').join(' ')} text` }}
              </template>
            </Tooltip>
          </template>
        </Row>
        <br />
        <!-- <template v-for="state in states" :key="state">
          <Slider :state="state" :value="20 + Math.random() * 40"></Slider>
        </template>
        <br /> -->
        <template v-for="meta in sliderMeta" :key="meta.state">
          <Slider :state="meta.state" :value="meta.value"></Slider>
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
        <Collapse style="max-width: 600px;">
          <CollapsePane v-for="n in 3" :key="n" :title="`Title ${n}`">
            <p>Some Content</p>
            <p>Some Content</p>
          </CollapsePane>
        </Collapse>
        <br />
        <Collapse card style="max-width: 600px;">
          <CollapsePane v-for="n in 3" :key="n" :title="`Title ${n}`">
            <p>Some Content</p>
            <p>Some Content</p>
          </CollapsePane>
        </Collapse>
      </NativeScroll>
    </template>
    <template #right>
      <NativeScroll height="100%" use-y-bar>
        <Button type="info" @on-click="drawerActive = !drawerActive">
          Open Drawer
        </Button>
        <Button type="success" @on-click="modalActive = !modalActive">
          Open Modal
        </Button>
        <Button
          type="warning"
          @on-click="Confirm.open({
            content: 'Confirm to submit?',
            confirmType: 'success'
          })"
        >
          Open Drawer
        </Button>
        <Drawer
          v-model:active="drawerActive"
          transfer
          resizable
          title="Title"
        >
          <p>Some Content</p>
          <p>Some Content</p>
          <p>Some Content</p>
        </Drawer>
        <Modal
          v-model:active="modalActive"
          transfer
          draggable
          resizable
          title="Title"
          :width="500"
        >
          <p>Some Content</p>
          <p>Some Content</p>
          <p>Some Content</p>
        </Modal>
        <br />
        <br />
        <div style="display: flex;">
          <Button type="primary" style="margin-right: 20px;" @on-click="spinActive = !spinActive">
            Switch
          </Button>
          <Spin :active="spinActive" tip="Loading..." style="width: 600px;">
            <Alert icon type="success" title="Title">
              Some alert content
            </Alert>
          </Spin>
        </div>
        <Upload
          multiple
          manual
          select-to-add
          allow-drag
          directory
          hidden-files
          style="max-width: 720px;"
        ></Upload>
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
          <Alert
            icon
            closable
            :type="type"
            style="max-width: 720px;"
          >
            Some alert content
          </Alert>
        </template>
        <template v-for="n in 2" :key="n">
          <Breadcrumb :border="n === 2" style="max-width: 720px; margin-bottom: 10px;">
            <BreadcrumbItem>This Computer</BreadcrumbItem>
            <BreadcrumbItem>Document (D:)</BreadcrumbItem>
            <BreadcrumbItem>ui-library</BreadcrumbItem>
            <BreadcrumbItem>vexip-ui</BreadcrumbItem>
          </Breadcrumb>
        </template>
        <br />
        <div style="display: flex;">
          <template v-for="n in 2" :key="n">
            <Menu :theme="n === 1 ? 'light' : 'dark'" style="width: 240px; margin-right: 20px;">
              <MenuItem
                v-for="meta in menuMeta"
                :key="meta.label"
                :label="meta.label"
                :icon="ArrowUpFromBracket"
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
        <template v-for="(meta, index) in paginationMeta" :key="index">
          <Pagination
            page-jump
            page-total
            page-count
            :background="meta.background"
            :no-border="meta.noBorder"
            :total="100"
            :page-size="10"
            :max-count="8"
          ></Pagination>
        </template>
        <br />
        <br />
        <Table
          :data="tableData"
          use-y-bar
          :width="700"
          :height="200"
        >
          <TableColumn type="selection" id-key="selection" fixed></TableColumn>
          <TableColumn type="order" id-key="order" fixed></TableColumn>
          <TableColumn type="expand" id-key="expand" fixed>
            <template #default="{ row }">
              <Grid style="padding: 20px 40px;">
                <Cell :width="12">
                  Full Name: {{ `${row.firstName} ${row.lastName}` }}
                </Cell>
                <Cell :width="12">
                  Age: {{ row.age }}
                </Cell>
                <Cell :width="12">
                  Job: {{ row.job }}
                </Cell>
                <Cell :width="12">
                  Email: {{ row.email }}
                </Cell>
              </Grid>
            </template>
          </TableColumn>
          <TableColumn
            name="First Name"
            id-key="firstName"
            sorter
            :width="300"
          ></TableColumn>
          <TableColumn
            name="Last Name"
            id-key="lastName"
            :width="300"
            :filter="tableFilter"
          ></TableColumn>
          <TableColumn
            name="Job"
            id-key="job"
            :order="3"
            fixed="right"
          ></TableColumn>
          <TableColumn
            name="Age"
            id-key="age"
            :order="2"
            no-ellipsis
            :width="300"
          ></TableColumn>
          <TableColumn name="Long Text" id-key="longText" :width="300">
            很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本
          </TableColumn>
        </Table>
        <br />
        <div style="display: flex;">
          <Timeline both-sides style="width: 50%; max-width: 360px;">
            <TimelineItem v-for="meta in timelineMeta" :key="meta.date" :type="meta.type">
              <p style="margin: 0 0 6px;">
                {{ meta.date }}
              </p>
              <Card style="width: 100%;">
                {{ meta.content }}
              </Card>
            </TimelineItem>
          </Timeline>
          <Timeline pending style="width: calc(50% - 30px); max-width: 300px; margin-left: 30px;">
            <TimelineItem v-for="meta in timelineMeta" :key="meta.date" :type="meta.type">
              <p style="margin: 0 0 6px;">
                {{ meta.date }}
              </p>
              <Card>{{ meta.content }}</Card>
            </TimelineItem>
          </Timeline>
        </div>
        <Bubble>
          Some content in bubble
        </Bubble>
        <br />
        <br />
        <Carousel
          loop
          arrow="inside"
          pointer="outside"
          style="width: 720px;"
          :view-size="1"
          :autoplay="5000"
        >
          <CarouselItem v-for="n in 5" :key="n">
            <div class="carousel-block">
              Content {{ n }}
            </div>
          </CarouselItem>
        </Carousel>
        <Carousel loop :active-offset="1" style="width: 720px;">
          <CarouselItem v-for="n in 5" :key="n">
            <template #default="{ active }">
              <div class="carousel-block" :style="{ transform: `scaleY(${active ? 1 : 0.83})` }">
                Content {{ n }}
              </div>
            </template>
          </CarouselItem>
        </Carousel>
        <br />
        <br />
      </NativeScroll>
    </template>
  </Split>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ThemeSwitch from './theme-switch.vue'
import { Message, Notice, Confirm } from '../components'
import { defineFilter } from '../components/table'
import { ArrowUpFromBracket } from '@vexip-ui/icons'

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
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3, disabled: true },
  { label: 'Option 4', value: 4, disabled: true },
  { label: 'Option 5', value: 5, divided: true },
  { label: 'Option 6', value: 6 },
  { label: 'Option 7', value: 7 },
  { label: 'Option 8', value: 8 },
  { label: 'Option 9', value: 9 },
  { label: 'Option 10', value: 10 },
  { label: 'Option 11', value: 11 },
  { label: 'Option 12', value: 12 }
]

const checkItems = ['Beijing', 'Tianjin', 'Shanghai', 'Guangzhou', 'Shenzhen']

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
  { disabled: false, underline: true, icon: ArrowUpFromBracket },
  { disabled: true, underline: false, icon: ArrowUpFromBracket }
]

const tooltipMeta = [
  { justify: 'center' as const, placements: ['top-start', 'top', 'top-end'] as const },
  { justify: 'space-between' as const, placements: ['left-start', 'right-start'] as const },
  { justify: 'space-between' as const, placements: ['left', 'right'] as const },
  { justify: 'space-between' as const, placements: ['left-end', 'right-end'] as const },
  { justify: 'center' as const, placements: ['bottom-start', 'bottom', 'bottom-end'] as const }
]

const sliderMeta = states.map(state => ({ state, value: 20 + Math.random() * 40 }))

const tabMeta = [
  { label: 'Tab 1', icon: null, disabled: false },
  { label: 'Tab 2', icon: null, disabled: false },
  { label: 'Tab 3', icon: null, disabled: true },
  { label: 'Tab 4', icon: ArrowUpFromBracket, disabled: false },
  { label: 'Tab 5', icon: ArrowUpFromBracket, disabled: true }
]

const spinActive = ref(true)
const drawerActive = ref(false)
const modalActive = ref(false)

const alertTypes = ['default', 'info', 'success', 'warning', 'error'] as const

const menuMeta = [
  { label: 'Menu 1', disabled: false },
  { label: 'Menu 2', disabled: false },
  { label: 'Menu 3', disabled: true },
  { label: 'Menu 4', disabled: false }
]

const messageTypes = [
  { prefix: 'Normal', type: 'info' as const },
  { prefix: 'Success', type: 'success' as const },
  { prefix: 'Warning', type: 'warning' as const },
  { prefix: 'Error', type: 'error' as const }
]
const messageOptions = {
  title: 'Title',
  content: 'A permanent content',
  duration: 0,
  closable: true,
  marker: true
}
const messageMeta = [
  { color: false, background: false },
  { color: true, background: false },
  { color: true, background: true }
]

const paginationMeta = [
  { background: false, noBorder: false },
  { background: true, noBorder: false },
  { background: false, noBorder: true },
  { background: true, noBorder: true }
]

const tableData = [
  {
    id: '1',
    job: 'Cashier',
    email: 'Angelique_Walsh2268@twace.org',
    firstName: 'Angelique',
    lastName: 'Walsh',
    age: '58'
  },
  {
    id: '2',
    job: 'Stockbroker',
    email: 'Aeris_Drake5867@gmail.com',
    firstName: 'Aeris',
    lastName: 'Drake',
    age: '40'
  },
  {
    id: '3',
    job: 'Machine Operator',
    email: 'Elisabeth_Rogers7566@sheye.org',
    firstName: 'Elisabeth',
    lastName: 'Rogers',
    age: '56'
  },
  {
    id: '4',
    job: 'Audiologist',
    email: 'Sharon_Tanner5855@nickia.com',
    firstName: 'Sharon',
    lastName: 'Tanner',
    age: '58'
  },
  {
    id: '5',
    job: 'Cashier',
    email: 'Evie_Farmer6650@typill.biz',
    firstName: 'Evie',
    lastName: 'Farmer',
    age: '26'
  },
  {
    id: '6',
    job: 'Dentist',
    email: 'Phillip_Rixon8188@gmail.com',
    firstName: 'Phillip',
    lastName: 'Rixon',
    age: '37'
  },
  {
    id: '7',
    job: 'Web Developer',
    email: 'Liam_Pickard9810@ovock.tech',
    firstName: 'Liam',
    lastName: 'Pickard',
    age: '32'
  },
  {
    id: '8',
    job: 'Staffing Consultant',
    email: 'Ruth_Mcleod599@naiker.biz',
    firstName: 'Ruth',
    lastName: 'Mcleod',
    age: '21'
  },
  {
    id: '9',
    job: 'Stockbroker',
    email: 'Marvin_Lakey4748@fuliss.net',
    firstName: 'Marvin',
    lastName: 'Lakey',
    age: '41'
  },
  {
    id: '10',
    job: 'Lecturer',
    email: 'Deborah_Santos5515@ubusive.com',
    firstName: 'Deborah',
    lastName: 'Santos',
    age: '29'
  }
]

const tableFilter = defineFilter({
  able: true,
  options: [
    { label: 'Starts with D', value: 'D' },
    { label: 'Starts with F', value: 'F' },
    { label: 'Starts with R', value: 'R' },
    { label: 'Starts with T', value: 'T' }
  ],
  multiple: true,
  method(values, row: { lastName: string }) {
    for (const value of values) {
      if (row.lastName.startsWith(value)) {
        return true
      }
    }

    return false
  }
})

const timelineMeta = [
  { date: '2022-05-24', content: 'Nice Day', type: 'default' as const },
  { date: '2022-05-25', content: 'Nice Day', type: 'success' as const },
  { date: '2022-05-26', content: 'Nice Day', type: 'warning' as const },
  { date: '2022-05-27', content: 'Nice Day', type: 'error' as const },
  { date: '2022-05-28', content: 'Nice Day', type: 'disabled' as const }
]
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  --bg-color: #fff;
  --body-bg-color: var(--vxp-fill-color-background);
  --ghost-bg-color: #234;
  --ghost-padding: 10px;

  height: 100%;

  &.dark {
    --bg-color: #131719;
    --body-bg-color: #1b1b1b;
    --ghost-bg-color: transparent;
    --ghost-padding: 0;
  }
}

body {
  height: 100%;
  margin: 0;
  overflow: hidden;
  color: var(--vxp-content-color-base);
  background-color: var(--body-bg-color);
  transition: var(--vxp-transition-background);
}

#app {
  height: 100%;
  padding: 10px 40px 30px;
}

.theme-nav {
  height: 50px;
}

.theme-view {
  width: 100%;
  height: calc(100% - 50px);
  background-color: var(--bg-color);
  border: var(--vxp-border-base);
  border-radius: var(--vxp-border-radius-large);
  transition: var(--vxp-transition-background), var(--vxp-transition-border);

  & > .vxp-split__pane {
    height: 100%;
    padding: 20px 5px;

    .vxp-native-scroll {
      padding: 0 10px;
    }
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

.carousel-block {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 160px;
  font-size: 30px;
  color: #fff;
  background-color: var(--vxp-color-primary-opacity-2);
  transition: transform 250ms;
}
</style>
