<script setup lang="ts">
import { globalIcons } from '@vexip-ui/config'
import { useBEM } from '@vexip-ui/bem-helper'

const nh = useBEM('internal-icons')
</script>

<template>
  <div :class="nh.b()">
    <article
      v-for="(icon, name) in globalIcons"
      :key="name"
      :class="nh.be('cell')"
      role="none"
    >
      <div :class="nh.be('item')">
        <span :class="nh.be('icon')">
          <Icon v-bind="icon" :scale="(icon.scale || 1) * 1.6" :label="name"></Icon>
        </span>
        <span :class="nh.be('name')">{{ name }}</span>
      </div>
    </article>
  </div>
</template>

<style lang="scss">
.internal-icons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
  padding: 10px 0;

  &__cell {
    position: relative;
    padding-top: 100%;

    @supports (aspect-ratio: 1 / 1) {
      aspect-ratio: 1 / 1;
      padding-top: 0;
    }
  }

  &__item {
    position: absolute;
    inset: 0;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: var(--vxp-fill-color-background);
    border-radius: var(--vxp-radius-base);
    transition: var(--vxp-transition-background);

    &:hover {
      background-color: var(--vxp-color-primary-opacity-8);
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    height: 30px;
    user-select: none;
  }

  &__name {
    margin-top: 16px;
  }
}
</style>
