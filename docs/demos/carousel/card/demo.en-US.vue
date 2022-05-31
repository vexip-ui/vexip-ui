<template>
  <Carousel loop :active-offset="1" style="max-width: 1000px;">
    <CarouselItem v-for="n in 5" :key="n">
      <template #default="{ active }">
        <div class="demo-pane" :style="{ transform: `scaleY(${active ? 1 : 0.83})` }">
          内容{{ n }}
        </div>
      </template>
    </CarouselItem>
  </Carousel>
</template>

<style>
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
