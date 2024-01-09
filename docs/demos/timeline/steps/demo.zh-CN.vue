<template>
  <Button type="primary" :disabled="currentStep <= 0" @click="--currentStep">
    上一步
  </Button>
  <Button type="primary" :disabled="currentStep >= steps.length - 1" @click="++currentStep">
    下一步
  </Button>
  <br />
  <br />
  <Timeline horizontal>
    <TimelineItem v-for="(step, index) in steps" :key="index" :class="getStateClass(index)">
      <div :class="['step-text', getStateClass(index)]">
        {{ step.text }}
      </div>

      <template #signal>
        <div :class="['step-signal', getStateClass(index)]">
          <Icon v-if="currentStep > index" :icon="Check"></Icon>
          <template v-else>
            {{ index + 1 }}
          </template>
        </div>
      </template>

      <template #line>
        <div :class="['step-state', getStateClass(index)]">
          <template v-if="currentStep > index">
            已完成
          </template>
          <template v-else-if="currentStep === index">
            进行中
          </template>
          <template v-else>
            等待中
          </template>
        </div>
      </template>
    </TimelineItem>
  </Timeline>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Check } from '@vexip-ui/icons'

const currentStep = ref(1)

const steps = [{ text: '第一步的描述' }, { text: '第二步的描述' }, { text: '最后一步的描述' }]

function getStateClass(index: number) {
  return {
    finished: currentStep.value > index,
    'in-progress': currentStep.value === index
  }
}
</script>

<style scoped>
.vxp-timeline {
  --vxp-timeline-pointer-size: 32px;
  --vxp-timeline-line-inset-end: 10px;

  min-width: 800px;
}

.vxp-timeline__item {
  flex: 1;
}

.vxp-timeline__item:last-child {
  flex: none;
  min-width: 100px;
}

.vxp-timeline__item.finished {
  --vxp-timeline-line-color: var(--vxp-color-primary-opacity-6);
}

.step-text {
  position: relative;
  color: var(--vxp-content-color-disabled);
  transform: translate(calc(var(--vxp-timeline-pointer-size) + 10px), -10px);
}

.step-state {
  padding: 0 10px;
  line-height: 1;
  color: var(--vxp-content-color-disabled);
  white-space: nowrap;
}

.finished {
  color: var(--vxp-content-color-secondary);
}

.in-progress {
  color: var(--vxp-content-color-base);
}

.step-signal {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--vxp-timeline-pointer-size);
  height: var(--vxp-timeline-pointer-size);
  line-height: 1;
  color: var(--vxp-content-color-disabled);
  background-color: var(--vxp-fill-color-background);
  border-radius: 50%;
  transition: var(--vxp-transition-color), var(--vxp-transition-background);
}

.step-signal.finished {
  color: var(--vxp-color-primary-base);
  background-color: var(--vxp-color-primary-opacity-9);
}

.step-signal.in-progress {
  color: #fff;
  background-color: var(--vxp-color-primary-base);
}
</style>
