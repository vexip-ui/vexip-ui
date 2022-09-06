<template>
  <Row>
    <Column :span="16">
      <div
        ref="viewer"
        style="
          height: 400px;
          padding: 15px;
          margin-right: 15px;
          overflow: auto;
          box-shadow: 0 0 1px;
"
      >
        <p v-for="n in 5" :key="n" style="height: 50px;">
          一些用来填充的内容
        </p>
        <h2 id="anchor-1">
          锚点 1
        </h2>
        <p v-for="n in 5" :key="n" style="height: 50px;">
          一些用来填充的内容
        </p>
        <h2 id="anchor-2">
          锚点 2
        </h2>
        <p v-for="n in 5" :key="n" style="height: 50px;">
          一些用来填充的内容
        </p>
        <h2 id="anchor-3">
          锚点 3
        </h2>
        <p v-for="n in 5" :key="n" style="height: 50px;">
          一些用来填充的内容
        </p>
        <h3 id="anchor-3-1">
          锚点 3-1
        </h3>
        <p v-for="n in 5" :key="n" style="height: 50px;">
          一些用来填充的内容
        </p>
        <h3 id="anchor-3-2">
          锚点 3-2
        </h3>
        <p v-for="n in 5" :key="n" style="height: 50px;">
          一些用来填充的内容
        </p>
        <h3 id="anchor-3-3">
          锚点 3-3
        </h3>
        <p v-for="n in 5" :key="n" style="height: 50px;">
          一些用来填充的内容
        </p>
      </div>
    </Column>
    <Column :span="8">
      <Anchor viewer="ref:viewer" :options="anchorLinks"></Anchor>
    </Column>
  </Row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const anchorLinks = ref([
  { to: '#anchor-1', label: '锚点 1' },
  { to: '#anchor-2', label: '锚点 2' },
  {
    to: '#anchor-3',
    label: '锚点 3',
    children: [
      { to: '#anchor-3-1', label: '锚点 3-1' },
      { to: '#anchor-3-2', label: '锚点 3-2' },
      { to: '#anchor-3-3', label: '锚点 3-3' }
    ]
  }
])
</script>
