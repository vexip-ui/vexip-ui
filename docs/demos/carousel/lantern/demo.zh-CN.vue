<template>
  <Carousel
    loop
    arrow="inside"
    pointer="outside"
    style="max-width: 600px"
    :view-size="1"
    :autoplay="5000"
  >
    <CarouselItem v-for="n in 5" :key="n">
      <div class="demo-pane">
        内容{{ n }}
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
