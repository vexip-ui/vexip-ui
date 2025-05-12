<template>
  <p>
    Merge Tags:
    <Switch v-model:value="mergeTags"></Switch>
  </p>
  <Cascader
    v-model:value="value"
    :options="options"
    multiple
    clearable
    :merge-tags="mergeTags"
    :on-async-load="loadOptions"
  ></Cascader>
  <p>
    Current Value:
    {{ value }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Option {
  value: string,
  label: string,
  disabled: boolean,
  depth: number,
  hasChild: boolean,
  index: number,
  children: Option[] | null
}

const mergeTags = ref(false)
const value = ref([])
const options = createOptions()

function createOptions(depth = 1, prefix = 'Op', hasChild = true) {
  const options: Option[] = []

  for (let i = 1; i <= 10; ++i) {
    options.push({
      depth,
      hasChild,
      value: `${prefix}-${i}`,
      label: `${prefix}-${i}`,
      disabled: i % 4 === 0,
      index: i,
      children: null,
    })
  }

  return options
}

function loadOptions(data: Option) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.index % 3 === 0) {
        reject(new Error('load fail'))
      } else {
        resolve(createOptions(data.depth + 1, data.value, data.depth < 2))
      }
    }, 2000)
  })
}
</script>

<style scoped>
.vxp-cascader {
  max-width: 400px;
}
</style>
