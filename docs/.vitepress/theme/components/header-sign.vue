<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useRouter } from 'vitepress'

const router = useRouter()
const i18n = useI18n({ useScope: 'global' })

const version = __VERSION__

function toHomepage() {
  router.go(`/${i18n.locale.value}/`)
}
</script>

<template>
  <a class="header-sign" @click="toHomepage">
    <img class="header-sign__logo" src="/vexip-ui.svg" alt="vexip-ui" />
    <span class="header-sign__title"> Vexip UI </span>
    <Tag class="header-sign__version">
      {{ `v${version}` }}
    </Tag>
  </a>
</template>

<style lang="scss">
@use '../style/mixins.scss' as *;

.header-sign {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 100%;
  padding-inline: 20px 16px;
  font-family:
    Avenir,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    'Noto Sans',
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji';
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: width var(--vxp-transition-base);

  @include query-media('lg') {
    justify-content: center;
    width: var(--aside-width);
    padding: 0;
  }

  @include query-media('xl') {
    width: var(--aside-width);
  }

  &,
  &:hover {
    color: var(--vxp-content-color-primary);
  }

  &__logo {
    height: 32px;

    @include query-media('lg') {
      margin-inline-end: 14px;
    }
  }

  &__title {
    display: none;
    white-space: nowrap;

    @include query-media('lg') {
      display: block;
    }
  }

  &__version {
    display: none;

    @include query-media('lg') {
      display: block;
      margin-inline-start: 6px;
      margin-top: 2px;
      transform: scale(0.8);
    }
  }
}
</style>
