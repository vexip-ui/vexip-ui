<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useI18n } from 'vue-i18n'

import metaData from 'vexip-ui/meta-data/contributors.json'

const { page } = useData()
const { t } = useI18n()

const componentRE = /[\\/]component[\\/](.+)\.(html|md)/
const avatarSize = 38

const visible = computed(() => {
  return componentRE.test(page.value.relativePath)
})
const contributors = computed(() => {
  if (!visible.value) return []

  const component = page.value.relativePath.match(componentRE)![1]

  return metaData[component as 'button'].map(item => ({
    avatar: item.avatarUrl,
    name: item.name || item.login,
    homepage: item.url
  }))
})
</script>

<template>
  <div v-if="visible" class="contributors">
    <h2 class="contributors__title">
      {{ t('common.contributors') }}
    </h2>
    <div class="contributors__description">
      {{ t('common.thanksContribute') }}
    </div>
    <div class="contributors__list">
      <Tooltip v-for="(contributor, index) in contributors" :key="index" reverse>
        <template #trigger>
          <Linker :to="contributor.homepage" :style="{ width: `${avatarSize}px`, margin: '0' }">
            <Avatar
              class="contributors__avatar"
              circle
              :src="contributor.avatar"
              :size="avatarSize"
            ></Avatar>
          </Linker>
        </template>
        <div class="contributors__name">
          {{ contributor.name }}
        </div>
      </Tooltip>
    </div>
  </div>
</template>

<style lang="scss">
.contributors {
  &__description {
    margin: 1em 0 30px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
    grid-auto-flow: row dense;
    grid-row-gap: 10px;
    width: 100%;
  }

  &__avatar {
    cursor: pointer;
  }

  &__name {
    width: 100%;
    text-align: center;
  }
}
</style>
