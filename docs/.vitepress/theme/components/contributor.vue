<script setup lang="ts">
import contributors from 'vexip-ui/meta-data/contributors.json'
import { computed } from 'vue'

const props = defineProps<{
  source: string
}>()

const contributorInfo = computed(() => {
  return contributors[props.source as 'button'].map(item => ({
    src: item.avatarUrl,
    text: item.name || item.login,
    link: item.url
  }))
})

const handleClick = (contributorInfo: { src: string, text: string, link: string }) => {
  window.open(contributorInfo.link)
}
</script>

<template>
  <div class="contributor-wrap">
    <Tooltip v-for="(item, index) in contributorInfo" :key="index">
      <template #trigger>
        <Avatar
          class="contributor-img"
          :src="item.src"
          :size="38"
          :gap="10"
          style="margin: 0"
          circle
          @click="handleClick(item)"
        ></Avatar>
      </template>
      {{ item.text }}
    </Tooltip>
  </div>
</template>

<style scoped>
.contributor-wrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
  grid-auto-flow: row dense;
  grid-row-gap: 10px;
  width: 100%;
}

.contributor-img {
  cursor: pointer;
}
</style>
