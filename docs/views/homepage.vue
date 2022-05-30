<template>
  <section :class="prefix">
    <div :class="`${prefix}__sign`">
      <img :class="`${prefix}__logo`" src="../assets/logo.png" alt="logo.png" />
      <h1 :class="`${prefix}__title`">
        Vexip UI
      </h1>
      <p :class="`${prefix}__description`">
        {{ getMetaName(language, slogan, false) }}
      </p>
      <div :class="`${prefix}__actions`">
        <Button type="primary" size="large" @click="getStarted">
          {{ getMetaName(language, start, false) }}
        </Button>
        <Button size="large" :icon="GithubB" @click="toRepository">
          GitHub
        </Button>
      </div>
      <MajorColor></MajorColor>
    </div>
    <!-- <a :class="`${prefix}__record`" href="https://beian.miit.gov.cn/" target="_blank">
      粤ICP备2020125887号
    </a> -->
  </section>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { GithubB } from '@vexip-ui/icons'
import MajorColor from '../common/major-color.vue'
import { getMetaName } from '../common/meta-name'

const globalState = inject('globalState', { language: __ROLLBACK_LANG__ })

const prefix = 'homepage'
const router = useRouter()
const language = computed(() => globalState.language)

const slogan = {
  name: 'Prue composition Api, Full TypeScript, Performance should be good',
  cname: '纯组合式 Api，全量的 TypeScript，性能应该还不错'
}
const start = {
  name: 'Get Started',
  cname: '开始使用'
}

function getStarted() {
  router.push(`/${globalState.language}/guides/started`)
}

function toRepository() {
  window.open('//github.com/qmhc/vexip-ui/')
}
</script>

<style lang="scss">
.homepage {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 5rem;

  &__sign {
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
  }

  &__logo {
    width: 240px;
    height: 240px;
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
}
</style>
