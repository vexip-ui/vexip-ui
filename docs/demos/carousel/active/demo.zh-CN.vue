<template>
  <Carousel loop :active-offset="1" style="max-width: 1000px">
    <CarouselItem v-for="n in 5" :key="n">
      <template #default="{ active }">
        <div
          class="demo-pane"
          :style="{ backgroundColor: active ? 'var(--vxp-color-warning-base)' : undefined }"
        >
          内容{{ n }}
        </div>
      </template>
    </CarouselItem>
  </Carousel>
</template>

<style scoped>
.demo-pane {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 240px;
  font-size: 30px;
  color: #fff;
  background-color: var(--vxp-color-primary-base);
  transition: var(--vxp-transition-transform);
}
</style>
