<template>
  <Carousel autoplay style="width: 600px;">
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
  background-color: #4dabf7;
  transition: transform 250ms;
}

.demo-pane--vertical {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 100%;
  font-size: 30px;
  color: #fff;
  background-color: #4dabf7;
}
</style>
