<template>
  <Button>Default</Button>
  <Button type="primary">
    Primary
  </Button>
  <Button type="dashed">
    Dashed
  </Button>
  <Button type="text">
    Text
  </Button>
  <Button type="info">
    Info
  </Button>
  <Button type="success">
    Success
  </Button>
  <Button type="warning">
    Warning
  </Button>
  <Button type="error">
    Error
  </Button>
  <br />
  <br />
  <Button>Default</Button>
  <Button disabled>
    Default
  </Button>
  <Button type="primary">
    Primary
  </Button>
  <Button disabled type="primary">
    Primary
  </Button>
  <br />
  <br />
  <Button type="primary" icon="search">
    搜索
  </Button>
  <Button type="primary" icon="search"></Button>
  <Button circle type="primary" icon="search">
    搜索
  </Button>
  <Button circle type="primary" icon="search"></Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from '..'

import '@/common/icons/search'

export default defineComponent({
  name: 'App',
  components: {
    Button
  }
})
</script>

<style lang="scss"></style>
