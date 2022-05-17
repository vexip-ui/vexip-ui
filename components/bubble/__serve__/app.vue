<template>
  <div style="display: inline-block; padding: 0 30px;">
    <template v-for="pl in placements" :key="pl">
      <Bubble :placement="pl">
        {{ pl }}
      </Bubble>
      <br />
      <br />
    </template>
  </div>
  <div style="display: inline-block; padding: 0 30px;">
    <template v-for="pl in placements" :key="pl">
      <Bubble background="var(--vxp-color-primary-base)" :placement="pl">
        {{ pl }}
      </Bubble>
      <br />
      <br />
    </template>
  </div>
  <div style="display: inline-block; padding: 0 30px;">
    <template v-for="pl in placements" :key="pl">
      <Bubble shadow :placement="pl">
        {{ pl }}
      </Bubble>
      <br />
      <br />
    </template>
  </div>
</template>

<script setup lang="ts">
import { Bubble } from '..'

const placements = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end'
] as const
</script>
