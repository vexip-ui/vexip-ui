
<template>
  <Header></Header>
  <section class="page-viewer">
    <router-view v-slot="{ Component }">
      <transition name="vxp-fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { provide, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Header from '../common/header.vue'

const props = defineProps({
  language: {
    type: String,
    default: __ROLLBACK_LANG__
  }
})

const i18n = useI18n({ useScope: 'global' })
i18n.locale.value = props.language

provide('globalState', props)

watch(
  () => props.language,
  value => {
    i18n.locale.value = value
  }
)
</script>

<style>
.page-viewer {
  height: calc(100% - 65px);
}
</style>
