<template>
  <section :class="prefix">
    <div :class="`${prefix}__sign`">
      <img :class="`${prefix}__logo`" src="../assets/logo.png" alt="logo.png" />
      <h1 :class="`${prefix}__title`">
        Vexip UI
      </h1>
      <p :class="`${prefix}__description`">
        纯组合式 Api，全量的 TypeScript，性能应该还不错
      </p>
      <div :class="`${prefix}__actions`">
        <Button type="primary" size="large" @click="getStarted">
          开始使用
        </Button>
        <Button size="large" :icon="GithubB" @click="toRepository">
          GitHub
        </Button>
      </div>
    </div>
    <a :class="`${prefix}__record`" href="https://beian.miit.gov.cn/" target="_blank">
      粤ICP备2020125887号
    </a>
  </section>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { GithubB } from '@vexip-ui/icons'

const globalState = inject('globalState', { language: __ROLLBACK_LANG__ })

const prefix = 'homepage'
const router = useRouter()

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
