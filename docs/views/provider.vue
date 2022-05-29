
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
import { provide } from 'vue'
import Header from '../common/header.vue'

const props = defineProps({
  language: {
    type: String,
    default: __ROLLBACK_LANG__
  }
})

provide('globalState', props)
</script>
