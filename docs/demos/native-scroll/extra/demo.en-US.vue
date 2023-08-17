<template>
  <div style="max-width: 360px; border: var(--vxp-border-base)">
    <NativeScroll use-y-bar :height="180">
      <p v-for="n in 9" :key="n">
        {{ n }}. Scroll mouse wheel here
      </p>
      <template #extra="{ getState, scrollTo }">
        <Transition name="vxp-fade">
          <Button
            v-if="getState().scrollY > 60"
            style="position: absolute; inset-inline-end: 12px; bottom: 12px"
            @click="scrollTo(0, 0)"
          >
            Back to top
          </Button>
        </Transition>
      </template>
    </NativeScroll>
  </div>
</template>

<style scoped>
.vxp-native-scroll p {
  padding: 5px 10px;
}
</style>
