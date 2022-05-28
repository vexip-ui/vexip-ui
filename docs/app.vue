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
import Header from './common/header.vue'
</script>
