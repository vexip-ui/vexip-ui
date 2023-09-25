<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useI18n } from 'vue-i18n'

import MajorColor from './major-color.vue'
import Wave from './wave.vue'
import { Message } from 'vexip-ui'
import { useRouter } from 'vitepress'
import { getDemoPrefix, setDemoPrefix } from '../common/demo-prefix'

const prefix = 'homepage'
const router = useRouter()
const { t, locale } = useI18n({ useScope: 'global' })

const wave = ref<InstanceType<typeof Wave>>()
const sign = ref<HTMLElement>()

const waveTop = ref(494)

const demoPrefix = ref(getDemoPrefix())
const invalid = ref(false)
const showError = computed(() => !!demoPrefix.value && invalid.value)

const validRE = /^[a-zA-Z]([0-9a-zA-Z]+)?$/

watch(demoPrefix, value => {
  invalid.value = !validRE.test((value || '').trim())
})

function getStarted() {
  router.go(`/${locale.value}/guide/vexip-ui`)
}

function getComponents() {
  router.go(`/${locale.value}/component/button`)
}

function refreshWave() {
  wave.value?.refresh()
}

// function handleResize() {
//   if (!sign.value) return

//   waveTop.value = Math.round(sign.value.getBoundingClientRect().height * 0.93)
// }

function handleSvaePrefix() {
  if (showError.value) return

  setDemoPrefix(demoPrefix.value)
  Message.success(t('common.prefixChanged'))
}
</script>

<template>
  <section :class="prefix" :style="{ '--wave-top': `${waveTop}px` }">
    <ClientOnly>
      <div :class="`${prefix}__wave`">
        <div :class="`${prefix}__wave-block`"></div>
        <Wave ref="wave" style="position: relative"></Wave>
      </div>
    </ClientOnly>
    <div ref="sign" :class="`${prefix}__sign`">
      <img :class="`${prefix}__logo`" src="/vexip-ui.svg" alt="vexip-ui" />
      <h1 :class="`${prefix}__title`">
        Vexip UI
      </h1>
      <p :class="`${prefix}__description`">
        {{ t('common.slogan') }}
      </p>
      <div :class="`${prefix}__actions`">
        <Button type="primary" size="large" @click="getStarted">
          {{ t('common.getStarted') }}
        </Button>
        <Button size="large" @click="getComponents">
          {{ t('common.getComponents') }}
        </Button>
      </div>
    </div>
    <P :type="showError ? 'error' : 'default'" style="margin: 0 0 16px; font-size: 15px">
      {{ showError ? t('common.invalidPrefix') : t('common.changePrefix') }}
    </P>
    <Input
      v-model:value="demoPrefix"
      sync
      :class="`${prefix}__prefix`"
      placeholder="e.g. Vxp"
    >
      <template #after-action>
        <Button type="primary" :disabled="showError" @click="handleSvaePrefix">
          {{ t('common.apply') }}
        </Button>
      </template>
    </Input>
    <MajorColor :class="`${prefix}__colors`" @change="refreshWave"></MajorColor>
  </section>
</template>

<style lang="scss">
.homepage {
  --wave-top: 494px;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  user-select: none;

  &__wave {
    position: absolute;
    top: 0;
    z-index: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    pointer-events: none;

    &-block {
      height: var(--wave-top);
      background-image: linear-gradient(to bottom, transparent, var(--vxp-color-primary-opacity-8));
    }
  }

  &__sign {
    position: relative;
    margin-bottom: 100px;
  }

  &__logo {
    height: 210px;
    margin-top: 50px;
  }

  &__title {
    margin: 1rem 0;
    font-size: 3rem;
    font-weight: 400;
  }

  &__description {
    padding: 0 1rem;
    margin-bottom: 1rem;
    font-size: 1.4rem;
    font-weight: 300;
    line-height: 1.2;
    color: var(--vxp-content-color-base);
    text-align: center;
  }

  &__actions {
    padding: 2rem 0;

    .vxp-button {
      width: 8rem;
      font-size: 1rem;
    }
  }

  &__prefix {
    max-width: 200px;
    margin-bottom: 20px;

    .vxp-input__control {
      width: 100%;
    }
  }

  &__colors {
    position: relative;
    width: 100%;
  }
}
</style>
