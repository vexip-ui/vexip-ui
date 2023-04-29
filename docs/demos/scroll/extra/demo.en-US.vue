<template>
  <div style="max-width: 360px; border: var(--vxp-border-base)">
    <Scroll use-y-bar :height="180">
      <p v-for="n in 9" :key="n">
        {{ n }}. Scroll mouse wheel here
      </p>
      <template #extra="{ getState, scrollTo }">
        <transition name="vxp-fade">
          <Button
            v-if="getState().scrollY > 60"
            style="position: absolute; right: 12px; bottom: 12px"
            @click="scrollTo(0, 0)"
          >
            Back to top
          </Button>
        </transition>
      </template>
    </Scroll>
  </div>
</template>

<style scoped>
.vxp-scroll p {
  padding: 5px 10px;
}
</style>
