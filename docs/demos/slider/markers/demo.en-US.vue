<template>
  <p>
    Disabled:
    <Switch v-model:value="state.disabled"></Switch>
  </p>
  <p>
    Reverse:
    <Switch v-model:value="state.reverse"></Switch>
  </p>
  <p>
    Flip Marker:
    <Switch v-model:value="state.flipMarker"></Switch>
  </p>
  <p>
    With Label:
    <Switch v-model:value="withLabel"></Switch>
  </p>
  <Space vertical style="max-width: 400px; margin-bottom: 20px">
    <Slider v-bind="state" :value="56" :markers="markers"></Slider>
    <Slider
      v-bind="state"
      :value="[18, 76]"
      :min="-50"
      :max="150"
      range
      :markers="markers"
    ></Slider>
  </Space>
  <Space :size="[24, 16]" style="height: 200px; margin-bottom: 20px">
    <Slider
      v-bind="state"
      :value="56"
      vertical
      :markers="markers"
    ></Slider>
    <Slider
      v-bind="state"
      :value="[18, 76]"
      :min="-50"
      :max="150"
      vertical
      range
      :markers="markers"
    ></Slider>
  </Space>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const state = reactive({
  disabled: false,
  reverse: false,
  flipMarker: false
})

const withLabel = ref(true)

const labelMarkers = {
  0: '0°C',
  42: '42°C',
  68: {
    style: 'color: #fbc037',
    label: '68°C'
  },
  100: {
    style: {
      color: '#f03e3e'
    },
    label: '100°C'
  }
}
const noLabelMarkers = [0, 42, 68, 100]

const markers = computed(() => {
  return withLabel.value ? labelMarkers : noLabelMarkers
})
</script>
