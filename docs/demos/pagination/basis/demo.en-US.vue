<template>
  <Pagination v-model:active="currentPage" :total="50" :page-size="10"></Pagination>
  <p>Current Page: {{ currentPage }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentPage = ref(1)
</script>
