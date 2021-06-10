<template>
  <Row :gutter="[8, 16]">
    <Column :span="24">
      <div class="grid-block">
        span-24
      </div>
    </Column>
  </Row>
  <Row :gutter="8">
    <Column :span="12">
      <div class="grid-block">
        span-12
      </div>
    </Column>
    <Column :span="12">
      <div class="grid-block">
        span-12
      </div>
    </Column>
  </Row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Row from '../row'
import Column from '../column'

export default defineComponent({
  name: 'App',
  components: {
    Row,
    Column
  }
})
</script>

<style lang="scss">
.grid-block {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  color: #fff;
  background-color: #339af0;
  border-radius: 4px;
}
</style>
