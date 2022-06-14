<template>
  <Cascader
    :options="options"
    multiple
    clearable
    size="small"
    placeholder="有点太小了"
  ></Cascader>
  <br />
  <br />
  <Cascader
    :options="options"
    multiple
    clearable
    placeholder="比较正常"
  ></Cascader>
  <br />
  <br />
  <Cascader
    :options="options"
    multiple
    clearable
    size="large"
    placeholder="大一点的"
  ></Cascader>
  <br />
  <br />
  <Cascader
    :options="options"
    multiple
    clearable
    style="--vxp-input-height: 48px;"
    placeholder="大过头的"
  ></Cascader>
</template>

<script setup lang="ts">
const options = createOptions(3)

function createOptions(depth: number, prefix = 'Op', iterator = 1) {
  const options: Array<Record<string, any>> = []
  const isLeaf = iterator === depth

  for (let i = 1; i <= 10; ++i) {
    options.push({
      value: `${prefix}-${i}`,
      label: `${prefix}-${i}`,
      disabled: i % 4 === 0,
      children: isLeaf ? null : createOptions(depth, `${prefix}-${i}`, iterator + 1)
    })
  }

  return options
}
</script>

<style scoped>
.vxp-cascader {
  max-width: 400px;
}
</style>
