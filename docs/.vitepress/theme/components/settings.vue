<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import DemoPrefix from './demo-prefix.vue'
import DemoSfcOrder from './demo-sfc-order.vue'
import MajorColor from './major-color.vue'
import { useBEM } from '@vexip-ui/bem-helper'
import { Gear } from '@vexip-ui/icons'

const { t } = useI18n({ useScope: 'global' })

defineOptions({ inheritAttrs: false })

const nh = useBEM('settings')
const active = ref(false)
</script>

<template>
  <button
    v-bind="$attrs"
    type="button"
    :class="nh.b()"
    :title="t('common.openSettings')"
    @click="active = !active"
  >
    <Icon label="settings" :scale="1.55">
      <Gear></Gear>
    </Icon>
  </button>
  <Drawer
    v-model:active="active"
    transfer
    :width="320"
    :title="t('common.adjustSettings')"
    drawer-class="settings-panel"
  >
    <DemoPrefix :class="nh.be('item')"></DemoPrefix>
    <MajorColor :class="nh.be('item')" hide-list show-label></MajorColor>
    <DemoSfcOrder :class="nh.be('item')"></DemoSfcOrder>
  </Drawer>
</template>

<style lang="scss">
.settings {
  padding: 0;
  color: var(--vxp-content-color-base);
  cursor: pointer;
  background-color: transparent;
  border: 0;
  outline: 0;
  transition: var(--vxp-transition-color);

  &:hover,
  &:focus {
    color: var(--vxp-color-primary-base);
  }

  &-panel {
    .major-color__picker {
      align-items: start;
      width: 100%;
    }

    .vxp-color-picker {
      &,
      &__selector {
        width: 100%;
      }
    }
  }

  &-panel &__item {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
