<template>
  <Grid :columns="3">
    <Cell>
      <div class="content"></div>
    </Cell>
  </Grid>
  <br />
  <Grid :gap="8" :columns="24" cell-flex>
    <Cell :width="12">
      <div class="content"></div>
    </Cell>
    <Cell :width="12">
      <Grid :cell-flex="{ align: 'middle' }">
        <Cell>
          <div class="content"></div>
        </Cell>
      </Grid>
    </Cell>
  </Grid>
  <br />
  <Grid :gap="8">
    <Cell :left="0" :right="8">
      <div class="content"></div>
    </Cell>
    <Cell :width="8" :left="16">
      <div class="content"></div>
    </Cell>
    <Cell :width="8" :top="1" :left="8">
      <div class="content"></div>
    </Cell>
    <Cell :width="8" :top="2">
      <div class="content"></div>
    </Cell>
    <Cell :width="8" :top="2" :left="16">
      <div class="content"></div>
    </Cell>
  </Grid>
  <br />
  <Grid :gap="8" cell-flex>
    <Cell :width="8" :md="{ width: 12 }" :use-flex="false">
      <div class="content"></div>
    </Cell>
    <Cell :width="16" :md="{ width: 12 }">
      <div class="content"></div>
    </Cell>
  </Grid>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Grid } from '..'
import { Cell } from '@/components/cell'

export default defineComponent({
  name: 'App',
  components: {
    Grid,
    Cell
  }
})
</script>

<style lang="scss">
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 48px;
  color: #fff;
  background-color: #339af0;
  border-radius: 4px;
}
</style>
