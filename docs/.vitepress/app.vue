<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import Header from './components/header.vue'
import Homepage from './components/homepage.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <Layout :no-aside="frontmatter.homepage" style="height: 100vh">
    <template #header>
      <Header></Header>
    </template>
    <Homepage></Homepage>
  </Layout>
</template>
