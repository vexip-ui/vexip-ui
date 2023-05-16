<template>
  <Header @toggle-menu="store.expanded = $event"></Header>
  <router-view v-slot="{ Component }">
    <transition name="vxp-fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { inject, provide, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { vexipuiLocale } from '../i18n'
import Header from '../common/header.vue'

import type { Store } from '../symbol'

const props = defineProps({
  language: {
    type: String,
    default: __ROLLBACK_LANG__
  }
})

const store = inject<Store>('store')!

const i18n = useI18n({ useScope: 'global' })
i18n.locale.value = props.language
vexipuiLocale.value.locale = props.language

provide('globalState', props)

watch(
  () => props.language,
  value => {
    i18n.locale.value = value
    vexipuiLocale.value.locale = value
  }
)
</script>

<style>
.page-viewer {
  height: calc(100% - 65px);
}
</style>
