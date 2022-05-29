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
