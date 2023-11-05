<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import DemoPrefix from './demo-prefix.vue'
import DemoSfcOrder from './demo-sfc-order.vue'
import MajorColor from './major-color.vue'
import Wave from './wave.vue'
import { useRouter } from 'vitepress'
import { useBEM } from '@vexip-ui/bem-helper'

const router = useRouter()
const { t, locale } = useI18n({ useScope: 'global' })

const nh = useBEM('homepage')

const wave = ref<InstanceType<typeof Wave>>()
const sign = ref<HTMLElement>()

const waveTop = ref(494)

function getStarted() {
  router.go(`/${locale.value}/guide/vexip-ui`)
}

function getComponents() {
  router.go(`/${locale.value}/component/button`)
}

function refreshWave() {
  wave.value?.refresh()
}

const users: {
  name: string,
  slogan?: string,
  logo: string,
  link?: string
}[] = [
  {
    name: 'Fantastic-admin',
    slogan: '开箱即用的管理系统框架',
    logo: '/fantastic-admin.png',
    link: 'https://fantastic-admin.github.io/'
  }
]
</script>

<template>
  <section :class="nh.b()" :style="{ '--wave-top': `${waveTop}px` }">
    <ClientOnly>
      <div :class="nh.be('wave')">
        <div :class="nh.be('wave-block')"></div>
        <Wave ref="wave" style="position: relative"></Wave>
      </div>
    </ClientOnly>
    <div ref="sign" :class="nh.be('sign')">
      <img :class="nh.be('logo')" src="/vexip-ui.svg" alt="vexip-ui" />
      <h1 :class="nh.be('title')">
        Vexip UI
      </h1>
      <p :class="nh.be('description')">
        {{ t('common.slogan') }}
      </p>
      <div :class="nh.be('actions')">
        <Button type="primary" size="large" @click="getStarted">
          {{ t('common.getStarted') }}
        </Button>
        <Button size="large" @click="getComponents">
          {{ t('common.getComponents') }}
        </Button>
      </div>
    </div>
    <DemoPrefix :input-class="nh.be('prefix')"></DemoPrefix>
    <DemoSfcOrder :class="nh.be('sfc-order')"></DemoSfcOrder>
    <MajorColor
      :class="nh.be('colors')"
      show-label
      style="margin-bottom: 80px"
      @change="refreshWave"
    ></MajorColor>
    <P>
      {{ t('common.shareExperience') }}
    </P>
    <Button
      tag="a"
      circle
      href="mailto:544022268@qq.com"
      target="_blank"
      style="margin-bottom: 72px"
    >
      {{ t('common.tellUs') }}
    </Button>
    <div :class="nh.be('users')">
      <Tooltip v-for="user in users" :key="user.name" reverse>
        <template #trigger>
          <a :class="nh.be('user')" :href="user.link" target="_blank">
            <img :src="user.logo" />
          </a>
        </template>
        {{ `${user.name}${user.slogan ? ` - ${user.slogan}` : ''}` }}
      </Tooltip>
    </div>
  </section>
</template>

<style lang="scss">
.homepage {
  --wave-top: 494px;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-bottom: 120px;
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

  &__sfc-order {
    width: 100%;
    max-width: 200px;
    margin-bottom: 20px;
  }

  &__colors {
    position: relative;
    width: 100%;
  }

  &__users {
    width: 100%;
    max-width: 800px;
    padding: 0 20px;
  }

  &__user {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 84px;
    padding: 6px 0 24px;

    img {
      height: 100%;
      object-fit: contain;
      pointer-events: none;
    }
  }
}
</style>
