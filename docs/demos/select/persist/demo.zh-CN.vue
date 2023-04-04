<template>
  <Select
    v-model:value="values"
    multiple
    clearable
    :filter="toTrue"
    :persist="persist"
    :options="options"
    @change="handleChange"
    @filter-input="queryFilter"
    @toggle="handleToggle"
  ></Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toTrue, debounce } from '@vexip-ui/utils'

interface Option {
  label: string,
  value: number
}

const values = ref<number[]>([])
const persist = ref<Option[]>([])
const options = ref<Option[]>([])

const remoteOptions = [
  { label: 'Beijing', value: 1 },
  { label: 'Tianjin', value: 2 },
  { label: 'Shanghai', value: 3 },
  { label: 'Tongliao', value: 4 },
  { label: 'Anshan', value: 5 },
  { label: 'Fushun', value: 6 },
  { label: 'Zigong', value: 7 },
  { label: 'Panzhihua', value: 8 },
  { label: 'Luoyang', value: 9 },
  { label: 'Kaifeng', value: 10 },
  { label: 'Luohe', value: 11 },
  { label: 'Anyang', value: 12 },
  { label: 'Tongchuan', value: 13 },
  { label: 'Yanan', value: 14 },
  { label: 'Baoji', value: 15 },
  { label: 'Zhangye', value: 16 },
  { label: 'Qingyang', value: 17 },
  { label: 'Pingxiang', value: 18 },
  { label: 'Jingdezhen', value: 19 },
  { label: 'Xinyu', value: 20 },
  { label: 'Yichun', value: 21 },
  { label: 'Guangzhou', value: 22 }
]

let timer: ReturnType<typeof setTimeout>

const queryFilter = debounce((input: string) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    options.value = input ? remoteOptions.filter(({ label }) => label.includes(input)) : []
  }, 200)
})

function handleChange(values: number, options: Option[]) {
  console.log(options)
  persist.value = Array.from(options)
}

function handleToggle(visible: boolean) {
  if (!visible) {
    options.value = []
  }
}
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
