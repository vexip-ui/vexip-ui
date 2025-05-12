<template>
  <Row>
    <Column :span="16">
      <div
        ref="viewer"
        :style="{
          height: '400px',
          padding: '15px',
          marginInlineEnd: '15px',
          overflow: 'auto',
          boxShadow: '0 0 1px'
        }"
      >
        <p v-for="n in 5" :key="n" style="height: 50px">
          Some content to fill
        </p>
        <h2 id="anchor-1">
          Anchor 1
        </h2>
        <p v-for="n in 5" :key="n" style="height: 50px">
          Some content to fill
        </p>
        <h2 id="anchor-2">
          Anchor 2
        </h2>
        <p v-for="n in 5" :key="n" style="height: 50px">
          Some content to fill
        </p>
        <h2 id="anchor-3">
          Anchor 3
        </h2>
        <p v-for="n in 5" :key="n" style="height: 50px">
          Some content to fill
        </p>
        <h3 id="anchor-3-1">
          Anchor 3-1
        </h3>
        <p v-for="n in 5" :key="n" style="height: 50px">
          Some content to fill
        </p>
        <h3 id="anchor-3-2">
          Anchor 3-2
        </h3>
        <p v-for="n in 5" :key="n" style="height: 50px">
          Some content to fill
        </p>
        <h3 id="anchor-3-3">
          Anchor 3-3
        </h3>
        <p v-for="n in 5" :key="n" style="height: 50px">
          Some content to fill
        </p>
      </div>
    </Column>
    <Column :span="8">
      <Anchor viewer="ref:viewer" force-active :options="anchorLinks"></Anchor>
    </Column>
  </Row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const anchorLinks = ref([
  { to: '#anchor-1', label: 'Anchor 1' },
  { to: '#anchor-2', label: 'Anchor 2' },
  {
    to: '#anchor-3',
    label: 'Anchor 3',
    children: [
      { to: '#anchor-3-1', label: 'Anchor 3-1' },
      { to: '#anchor-3-2', label: 'Anchor 3-2' },
      { to: '#anchor-3-3', label: 'Anchor 3-3' },
    ],
  },
])
</script>
