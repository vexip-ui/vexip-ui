<template>
  <div :class="prefix">
    <div :class="`${prefix}__picker`">
      <p :class="`${prefix}__tip`">
        {{ getMetaName(language!, changeColor, false) }}
        <Icon :scale="1.2" @click="resetMajorColor">
          <ArrowRotateLeft></ArrowRotateLeft>
        </Icon>
      </p>
      <ColorPicker v-model:value="majorColor" format="rgb"></ColorPicker>
    </div>
    <div v-for="(colors, name) in seriesColors" :key="name" :class="`${prefix}__series`">
      <div v-for="(_, index) in colors" :key="index" :class="`${prefix}__series-item`">
        <div
          :class="`${prefix}__series-color`"
          :style="{
            backgroundColor: `var(--vxp-color-primary-${name}-${index + 1})`
          }"
        ></div>
        <span :class="`${prefix}__series-name`">
          {{ `${name}-${index + 1}` }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ArrowRotateLeft } from '@vexip-ui/icons'
import { getMetaName } from './meta-name'
import { computeSeriesColors } from './series-color'

defineProps({
  language: {
    type: String,
    default: __ROLLBACK_LANG__
  }
})

const emit = defineEmits(['change'])

const prefix = 'major-color'

const changeColor = {
  name: 'Change Major Color',
  cname: '换个主题色'
}

const rootEl = document.documentElement
const rootStyle = getComputedStyle(rootEl)

const majorColor = ref(rootStyle.getPropertyValue('--vxp-color-primary-base'))
const seriesColors = ref<Record<string, string[]>>(computeSeriesColors(majorColor.value))

watch(majorColor, value => {
  seriesColors.value = computeSeriesColors(value)
  emit('change', value)
})

function resetMajorColor() {
  majorColor.value = '#339af0'
}
</script>

<style lang="scss">
@use '../style/mixins.scss' as *;

.major-color {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
  user-select: none;

  &__picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }

  &__tip {
    display: flex;
    align-items: center;
    margin: 0 0 20px;
    font-size: 15px;

    .vxp-icon {
      margin-left: 3px;
      color: var(--vxp-content-color-third);
      cursor: pointer;
      transition: var(--vxp-transition-color);

      &:hover {
        color: var(--vxp-content-color-base);
      }
    }
  }

  &__series {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
      font-size: 13px;
      color: var(--vxp-content-color-secondary);

      @include query-media('md') {
        width: 80px;
      }
    }

    &-color {
      width: 40px;
      height: 20px;
      margin-bottom: 3px;
      border-radius: var(--vxp-border-radius-base);
    }

    &-name {
      display: none;

      @include query-media('md') {
        display: inline-block;
      }
    }
  }
}
</style>
