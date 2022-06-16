<template>
  <ConfigProvider :props="provideProps">
    <Grid :gap="8">
      <Cell>
        width-24
      </Cell>
    </Grid>
    <br />
    <Grid :gap="8" :columns="24">
      <Cell :width="12">
        width-12
      </Cell>
      <Cell :width="12">
        width-12
      </Cell>
    </Grid>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const provideProps = ref({
  grid: {
    cellFlex: () => ({ justify: 'center', align: 'middle' })
  }
})
</script>

<style scoped>
.vxp-cell {
  min-height: 48px;
  color: #fff;
  background-color: var(--vxp-color-primary-base);
  border-radius: var(--vxp-radius-base);
}
</style>
