<script setup lang="ts">
import { ref, watch } from 'vue'
import { ArrowRotateLeft, Dice } from '@vexip-ui/icons'
import { isClient, randomColor } from '@vexip-ui/utils'
import { useI18n } from 'vue-i18n'
import { computeSeriesColors } from '../common/series-color'

defineProps({
  language: {
    type: String,
    default: __ROLLBACK_LANG__
  }
})

const emit = defineEmits(['change'])
const { t } = useI18n()

const prefix = 'major-color'

const rootEl = isClient ? document.documentElement : undefined
const rootStyle = rootEl && getComputedStyle(rootEl)

const majorColor = ref(rootStyle ? rootStyle.getPropertyValue('--vxp-color-primary-base') : '')
const seriesColors = ref<Record<string, string[]>>(
  majorColor.value ? computeSeriesColors(majorColor.value) : {}
)

watch(majorColor, value => {
  if (value) {
    seriesColors.value = computeSeriesColors(value)
  }

  emit('change', value)
})

function rollMajorColor() {
  majorColor.value = randomColor()
}

function resetMajorColor() {
  majorColor.value = '#339af0'
}
</script>

<template>
  <div :class="prefix">
    <div :class="`${prefix}__picker`">
      <Space :class="`${prefix}__tip`" :size="4">
        {{ t('common.changeColor') }}
        <Tooltip>
          <template #trigger>
            <Icon :scale="1.4" @click="rollMajorColor">
              <Dice></Dice>
            </Icon>
          </template>
          {{ t('common.rollColor') }}
        </Tooltip>
        <Tooltip>
          <template #trigger>
            <Icon :scale="1.2" @click="resetMajorColor">
              <ArrowRotateLeft></ArrowRotateLeft>
            </Icon>
          </template>
          {{ t('common.resetColor') }}
        </Tooltip>
      </Space>
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
