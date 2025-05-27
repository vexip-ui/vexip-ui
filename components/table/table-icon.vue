<script setup lang="ts">
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'

import { computed, inject } from 'vue'

import { isFunction } from '@vexip-ui/utils'
import { TABLE_ACTIONS, TABLE_SLOTS } from './symbol'

import type { PropType } from 'vue'
import type { TableIconName } from './symbol'

defineOptions({ name: 'TableIcon' })

const props = defineProps({
  name: {
    type: String as PropType<TableIconName>,
    required: true,
  },
  origin: {
    type: Object,
    default: null,
  },
})

const tableActions = inject(TABLE_ACTIONS)!
const tableSlots = inject(TABLE_SLOTS)!

const customIcon = computed(() => tableActions.getIcon(props.name))
</script>

<template>
  <Renderer
    v-if="isFunction(tableSlots[`icon-${name}`])"
    :renderer="tableActions.renderTableSlot"
    :data="{ name: `icon-${name}` }"
  ></Renderer>
  <Icon v-else-if="tableActions.hasIcon(name)" :icon="customIcon"></Icon>
  <Icon v-else v-bind="origin"></Icon>
</template>
