<template>
  <ButtonGroup type="primary" style="margin-bottom: 10px">
    <Button @click="select">
      Select Node
    </Button>
    <Button @click="expand">
      Expand Node
    </Button>
    <Button @click="check">
      Check Node
    </Button>
  </ButtonGroup>
  <Tree ref="tree" checkbox :data="data"></Tree>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { Tree } from 'vexip-ui'

const tree = ref<InstanceType<typeof Tree>>()
const data = ref([
  {
    id: 1,
    label: 'Animal',
    parent: 0,
    expanded: true,
  },
  {
    id: 2,
    label: 'Bird',
    parent: 5,
  },
  {
    id: 3,
    label: 'Invertebrate',
    parent: 1,
  },
  {
    id: 4,
    label: 'Mammal',
    parent: 5,
  },
  {
    id: 5,
    label: 'Vertebrate',
    parent: 1,
  },
  {
    id: 6,
    label: 'Magpie',
    parent: 2,
  },
  {
    id: 7,
    label: 'Earthworm',
    parent: 3,
  },
  {
    id: 8,
    label: 'Jellyfish',
    parent: 3,
  },
  {
    id: 9,
    label: 'Pangolin',
    parent: 5,
  },
  {
    id: 10,
    label: 'Kestrel',
    parent: 2,
  },
])

function select() {
  tree.value?.selectNodeByData(data.value[1])
}

function expand() {
  tree.value?.expandNodeByData(data.value[1], undefined, true)
}

function check() {
  tree.value?.checkNodeByData(data.value[1])
}
</script>
