<template>
  <Space class="root">
    <CountTo
      ref="countTo"
      v-bind="inputForm"
      :autoplay="true"
      :use-easing="true"
      :easing-fn="easingFn"
      class="count-to"
    ></CountTo>

    <Space class="form">
      <template v-for="(item, key) in inputForm" :key="key">
        <Space>
          <label style="width: 50px;">{{ key }}</label>
          <Input v-model:value="inputForm[key]" :placeholder="key"></Input>
        </Space>
      </template>
    </Space>

    <Space>
      <Button type="primary" @click="start">
        开始
      </Button>
      <Button type="primary" @click="pause">
        暂停
      </Button>
      <Button type="primary" @click="resume">
        继续
      </Button>
      <Button type="primary" @click="toggle">
        自动切换
      </Button>
    </Space>

    <p>过渡函数</p>
    <Select v-model:value="selectedEasingFn" :options="options"></Select>
  </Space>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { CountTo, countToEasingFnUtils, type CountToProps } from 'vexip-ui'

type Key = keyof typeof countToEasingFnUtils

const countTo = ref<InstanceType<typeof CountTo>>()

const options = computed(() => Object.entries(countToEasingFnUtils).map(([key]) => key))
const selectedEasingFn = ref<Key>(countToEasingFnUtils.easeOut.name as Key)
const easingFn = computed(() => countToEasingFnUtils[selectedEasingFn.value])

const inputForm = reactive<Partial<CountToProps>>({
  start: 0,
  end: 2022.1224,
  duration: 3000,
  decimals: 4,
  separator: ',',
  prefix: '¥',
  suffix: 'RMB'
})

function start() {
  countTo.value!.start()
}

function pause() {
  countTo.value!.pause()
}

function resume() {
  countTo.value!.resume()
}

function toggle() {
  countTo.value!.toggle()
}
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
}

.count-to {
  font-size: 2.5rem;
  color: #f6416c;
}

.form {
  display: flex;
  width: 300px;
}
</style>
