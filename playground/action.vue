<script setup lang="ts">
import { ref } from 'vue'

import type { PropType } from 'vue'
import type { IconMinorProps } from 'vexip-ui'

defineOptions({ inheritAttrs: false })

defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: [Object, Function],
    default: null,
  },
  iconProps: {
    type: Object as PropType<IconMinorProps>,
    default: () => ({}),
  },
  showLabel: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<'button' | 'dropdown'>,
    default: 'button',
  },
  linkTo: {
    type: String,
    default: null,
  },
  options: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const value = defineModel('value', { type: String, default: '' })

const emit = defineEmits(['click'])

const visible = ref(false)

function handleClick() {
  emit('click')
  visible.value = false
}
</script>

<template>
  <template v-if="type === 'dropdown'">
    <Dropdown v-if="!showLabel" v-model:visible="visible" transfer>
      <button
        type="button"
        :class="['action', showLabel && 'action--has-label']"
        @click="handleClick"
      >
        <span class="action__icon">
          <slot>
            <Icon v-bind="iconProps" :icon="icon"></Icon>
          </slot>
        </span>
        <span v-if="showLabel">{{ label }}</span>
      </button>
      <template #drop>
        <DropdownList class="action__panel">
          <div>{{ label }}</div>
          <RadioGroup v-model:value="value" vertical size="small">
            <Radio v-for="option in options" :key="option" :label="option"></Radio>
          </RadioGroup>
          <Button
            type="primary"
            size="small"
            style="margin-top: 6px"
            @click="handleClick"
          >
            {{ label }}
          </Button>
        </DropdownList>
      </template>
    </Dropdown>
    <div v-else style="display: flex; flex-direction: column">
      <div type="button" :class="['action', showLabel && 'action--has-label']" @click="handleClick">
        <span class="action__icon">
          <slot>
            <Icon v-bind="iconProps" :icon="icon"></Icon>
          </slot>
        </span>
        <span v-if="showLabel">{{ label }}</span>
      </div>
      <div
        style="
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-inline-start: 16px;
          margin: 4px 0 8px;
        "
      >
        <RadioGroup v-model:value="value" vertical size="small">
          <Radio v-for="option in options" :key="option" :label="option"></Radio>
        </RadioGroup>
        <Button
          type="primary"
          size="small"
          style="margin-top: 6px"
          @click="handleClick"
        >
          {{ label }}
        </Button>
      </div>
    </div>
  </template>
  <Tooltip v-else reverse :disabled="showLabel">
    <template #trigger>
      <Linker v-if="linkTo" :class="['action', showLabel && 'action--has-label']" :to="linkTo">
        <span class="action__icon">
          <slot>
            <Icon v-bind="iconProps" :icon="icon"></Icon>
          </slot>
        </span>
        <span v-if="showLabel">{{ label }}</span>
      </Linker>
      <button
        v-else
        type="button"
        :class="['action', showLabel && 'action--has-label']"
        @click="handleClick"
      >
        <span class="action__icon">
          <slot>
            <Icon v-bind="iconProps" :icon="icon"></Icon>
          </slot>
        </span>
        <span v-if="showLabel">{{ label }}</span>
      </button>
    </template>
    {{ label }}
  </Tooltip>
</template>

<style lang="scss">
@use './style' as *;

.action {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: var(--vxp-content-color-secondary);
  cursor: pointer;
  background-color: transparent;
  border: 0;
  outline: 0;

  &:hover,
  &:focus {
    color: var(--vxp-content-color-base);
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
  }

  &--has-label {
    gap: 8px;
    justify-content: start;
    width: 100%;
    padding: 8px 2px;
    color: var(--vxp-content-color-base);

    &:hover,
    &:focus {
      color: var(--vxp-color-primary-base);
    }
  }

  &__panel {
    display: flex;
    flex-direction: column;
    padding: 5px 16px 12px;

    .vxp-radio {
      width: 100%;
      padding: 6px 0;
      margin: 0;
    }
  }
}
</style>
