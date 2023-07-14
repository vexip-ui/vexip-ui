<template>
  <template v-if="hasIcon(name)">
    <Renderer v-if="isFunction(customIcon)" :renderer="customIcon"></Renderer>
    <Icon v-else :icon="customIcon"></Icon>
  </template>
  <Renderer
    v-else-if="isFunction(tableSlots[`icon-${name}`])"
    :renderer="renderTableSlot"
    :data="{ name: `icon-${name}` }"
  ></Renderer>
  <Icon v-else v-bind="origin"></Icon>
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'

import { computed, defineComponent, inject } from 'vue'

import { isFunction } from '@vexip-ui/utils'
import { TABLE_ACTIONS, TABLE_SLOTS } from './symbol'

import type { PropType } from 'vue'
import type { TableIconName } from './symbol'

export default defineComponent({
  name: 'TableIcon',
  components: {
    Icon,
    Renderer
  },
  props: {
    name: {
      type: String as PropType<TableIconName>,
      required: true
    },
    origin: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const tableActions = inject(TABLE_ACTIONS)!
    const tableSlots = inject(TABLE_SLOTS)!

    const customIcon = computed(() => tableActions.getIcon(props.name))

    return {
      tableSlots,
      customIcon,

      isFunction,
      hasIcon: tableActions.hasIcon,
      renderTableSlot: tableActions.renderTableSlot
    }
  }
})
</script>
