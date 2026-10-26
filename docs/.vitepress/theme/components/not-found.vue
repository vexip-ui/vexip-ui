<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useRouter } from 'vitepress'

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()

function backHomepage() {
  router.go('/')
}
</script>

<template>
  <section class="not-found">
    <span class="not-found__content">
      <P class="not-found__tip">
        {{ t('common.pageNotFound') }}
      </P>
      <P class="not-found__sign"> 404 </P>
    </span>
    <Button type="primary" @click="backHomepage">
      {{ t('common.backHomepage') }}
    </Button>
  </section>
</template>

<style lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - var(--header-height));
  background-image: linear-gradient(to bottom, transparent, var(--vxp-color-primary-opacity-8));

  &__content {
    padding-top: 6vh;
    margin-bottom: 1em;
    color: var(--vxp-content-color-secondary);
    text-align: center;
  }

  &__tip {
    margin: 0;
    font-size: 24px;
    color: inherit;
  }

  &__sign {
    margin: 0;
    font-size: 48px;
    color: inherit;
  }
}
</style>
