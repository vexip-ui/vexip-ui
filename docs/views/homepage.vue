<template>
  <section :class="prefix">
    <NativeScroll use-y-bar>
      <img :class="`${prefix}__logo`" src="/logo.png" alt="logo.png" />
      <h1 :class="`${prefix}__title`">
        Vexip UI
      </h1>
      <p :class="`${prefix}__description`">
        {{ $t('common.slogan') }}
      </p>
      <div :class="`${prefix}__actions`">
        <Button type="primary" size="large" @click="getStarted">
          {{ $t('common.getStarted') }}
        </Button>
        <Button size="large" :icon="GithubB" @click="toRepository">
          GitHub
        </Button>
      </div>
      <MajorColor :class="`${prefix}__colors`" :language="language"></MajorColor>
    </NativeScroll>
  </section>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { GithubB } from '@vexip-ui/icons'
import MajorColor from '../common/major-color.vue'

const globalState = inject('globalState', { language: __ROLLBACK_LANG__ })

const prefix = 'homepage'
const router = useRouter()
const language = computed(() => globalState.language)

function getStarted() {
  router.push(`/${globalState.language}/components`)
}

function toRepository() {
  window.open('//github.com/qmhc/vexip-ui/')
}
</script>

<style lang="scss">
.homepage {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-top: var(--header-height);
  text-align: center;
  user-select: none;

  &__logo {
    width: 30%;
    min-width: 90px;
    max-width: 240px;
    margin-top: 80px;
  }

  &__title {
    margin-bottom: 1rem;
    font-size: 3rem;
    font-weight: 400;
  }

  &__description {
    margin-bottom: 1rem;
    font-size: 1.4rem;
    font-weight: 300;
    line-height: 1.2;
    color: var(--vxp-content-color-secondary);
    text-align: center;
  }

  &__actions {
    padding: 2rem 0;

    .vxp-button {
      width: 8rem;
      font-size: 1rem;
    }
  }

  &__record {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: var(--vxp-font-size-secondary);
    font-weight: 300;
    color: var(--vxp-content-color-placeholder);
    text-decoration: none;
    user-select: none;
  }

  &__colors {
    width: 100%;
  }
}
</style>
