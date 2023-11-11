<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { Message } from 'vexip-ui'
import { useBEM } from '@vexip-ui/bem-helper'
import { firstSfcOptions, getFirstSfc, setFirstSfc } from '../common/demo-sfc-order'

import type { FirstSfcType } from '../common/demo-sfc-order'

const { t } = useI18n({ useScope: 'global' })

const nh = useBEM('demo-sfc-order')

const firstSfc = computed(() => getFirstSfc())

function handleSavePrefix(value: FirstSfcType) {
  if (value === firstSfc.value) return

  setFirstSfc(value)
  Message.success(t('common.orderChanged'))
}
</script>

<template>
  <div :class="nh.b()">
    <P :class="nh.be('text')" style="margin: 0 0 16px; font-size: 15px">
      {{ t('common.changeOrder') }}
    </P>
    <div :class="nh.be('options')">
      <button
        v-for="option in firstSfcOptions"
        :key="option"
        :class="[nh.be('option'), firstSfc === option && nh.bem('option', 'active')]"
        @click="handleSavePrefix(option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.demo-sfc-order {
  display: flex;
  flex-direction: column;

  &__options {
    display: flex;
    gap: 16px;
    user-select: none;
  }

  &__option {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 32px;
    padding: 0;
    color: var(--vxp-content-color-base);
    cursor: pointer;
    background-color: transparent;
    border: var(--vxp-border-base);
    border-radius: var(--vxp-radius-base);
    outline-color: transparent;
    transition: var(--vxp-transition-color), var(--vxp-transition-background),
      var(--vxp-transition-border);

    &:hover,
    &:focus {
      color: var(--vxp-color-primary-base);
      border-color: var(--vxp-color-primary-base);
    }

    &--active {
      &,
      &:hover,
      &:focus {
        color: #fff;
        background-color: var(--vxp-color-primary-base);
        border-color: var(--vxp-color-primary-base);
      }
    }
  }
}
</style>
