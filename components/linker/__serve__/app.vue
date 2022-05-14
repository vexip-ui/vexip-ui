<template>
  <template v-for="(type) in types" :key="type">
    <Linker :type="type">
      链接
    </Linker>
  </template>
  <br />
  <br />
  <template v-for="(type) in types" :key="type">
    <Linker :type="type" disabled>
      链接
    </Linker>
  </template>
  <br />
  <br />
  <template v-for="(type) in types" :key="type">
    <Linker :type="type" underline icon="user">
      链接
    </Linker>
  </template>
  <br />
  <br />
  <template v-for="(type) in types" :key="type">
    <Linker :type="type" disabled icon="user">
      链接
    </Linker>
  </template>
</template>

<script setup lang="ts">
import { Linker } from '..'

import '@/common/icons/user'

const types = ['default', 'primary', 'success', 'error', 'warning', 'info'] as const
</script>
