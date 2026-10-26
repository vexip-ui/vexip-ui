<template>
  <Carousel autoplay style="max-width: 600px">
    <CarouselItem v-for="n in 5" :key="n">
      <div class="demo-pane">
        Content {{ n }}
      </div>
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
