<template>
  <section :class="prefix">
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
      <Button size="large" @click="getComponents">
        {{ $t('common.getComponents') }}
      </Button>
    </div>
    <MajorColor :class="`${prefix}__colors`" :language="language"></MajorColor>
  </section>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import MajorColor from '../common/major-color.vue'

const globalState = inject('globalState', { language: __ROLLBACK_LANG__ })

const prefix = 'homepage'
const router = useRouter()
const language = computed(() => globalState.language)

function getStarted() {
  router.push(`/${globalState.language}/guides/setup`)
}

function getComponents() {
  router.push(`/${globalState.language}/components`)
}
</script>

<style lang="scss">
.homepage {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
  padding: 40px 20px;
  padding-top: calc(var(--header-height) + 80px);
  overflow-y: auto;
  user-select: none;

  &__logo {
    width: 30%;
    min-width: 90px;
    max-width: 240px;
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
