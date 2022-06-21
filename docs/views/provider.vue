
<template>
  <Header @toggle-menu="menuExpanded = $event"></Header>
  <router-view v-slot="{ Component }">
    <transition name="vxp-fade" mode="out-in">
      <component :is="Component" :menu-expanded="menuExpanded"></component>
    </transition>
  </router-view>
  <Masker v-model:active="menuExpanded" closable></Masker>
</template>

<script setup lang="ts">
import { ref, watch, provide } from 'vue'
import { useI18n } from 'vue-i18n'
import { vexipuiLocale } from '../i18n'
import Header from '../common/header.vue'

const props = defineProps({
  language: {
    type: String,
    default: __ROLLBACK_LANG__
  }
})

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

const menuExpanded = ref(false)
</script>

<style>
.page-viewer {
  height: calc(100% - 65px);
}
</style>
