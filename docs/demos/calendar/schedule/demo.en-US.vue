<template>
  <Calendar>
    <template #content="{ date }">
      <p
        v-for="(item, index) in getData(date)"
        :key="index"
        style="margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
      >
        <Badge is-dot :type="item.type"></Badge>
        {{ item.content }}
      </p>
    </template>
  </Calendar>
</template>

<script setup lang="ts">
const badgeTypes = ['primary', 'warning', 'success', 'error', 'info', 'disabled'] as const
const dataMap: Record<number, ReturnType<typeof randomList>> = {
  5: randomList(2),
  12: randomList(3),
  21: randomList(7),
}

function randomList(count: number) {
  return Array.from({ length: count }, () => {
    const type = badgeTypes[Math.round(Math.random() * (badgeTypes.length - 1))]

    return { type, content: `This is ${type} tpye.` }
  })
}

function getData(date: Date) {
  return dataMap[date.getDate()] || []
}
</script>
