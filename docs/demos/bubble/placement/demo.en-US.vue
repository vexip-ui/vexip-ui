<template>
  <Row
    v-for="(meta, index) in placementMeta"
    :key="index"
    :justify="meta.justify"
    style="max-width: 500px; margin: 10px 0"
  >
    <template v-for="placement in meta.placements" :key="placement">
      <Bubble :placement="placement">
        <template v-if="meta.justify === 'center'">
          {{ `${placement.split('-')[0]} ${placement.split('-')[1] || 'center'}` }}
        </template>
        <template v-else>
          {{ placement.split('-')[0] }}
          <br />
          {{ placement.split('-')[1] || 'center' }}
        </template>
      </Bubble>
    </template>
  </Row>
</template>

<script setup lang="ts">
const placementMeta = [
  { justify: 'center' as const, placements: ['top-start', 'top', 'top-end'] as const },
  { justify: 'space-between' as const, placements: ['left-start', 'right-start'] as const },
  { justify: 'space-between' as const, placements: ['left', 'right'] as const },
  { justify: 'space-between' as const, placements: ['left-end', 'right-end'] as const },
  { justify: 'center' as const, placements: ['bottom-start', 'bottom', 'bottom-end'] as const },
]
</script>

<style>
.vxp-row--center {
  gap: 0 10px;
}
</style>
