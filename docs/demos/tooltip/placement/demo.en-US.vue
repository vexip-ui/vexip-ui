<template>
  <Row
    v-for="(meta, index) in tooltipMeta"
    :key="index"
    :justify="meta.justify"
    style="width: 500px; margin: 10px 0;"
  >
    <template v-for="placement in meta.placements" :key="placement">
      <Tooltip theme="dark" :placement="placement" trigger="click">
        <template #trigger>
          <span style="padding: 0 5px;">
            <Button style="width: 120px;">{{ placement }}</Button>
          </span>
        </template>
        {{ `The ${placement.split('-').join(' ')} text` }}
      </Tooltip>
    </template>
  </Row>
</template>

<script setup lang="ts">
const tooltipMeta = [
  { justify: 'center' as const, placements: ['top-start', 'top', 'top-end'] as const },
  { justify: 'space-between' as const, placements: ['left-start', 'right-start'] as const },
  { justify: 'space-between' as const, placements: ['left', 'right'] as const },
  { justify: 'space-between' as const, placements: ['left-end', 'right-end'] as const },
  { justify: 'center' as const, placements: ['bottom-start', 'bottom', 'bottom-end'] as const }
]
</script>
