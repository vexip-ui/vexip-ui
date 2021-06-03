<template>
  <div style="width: 500px;">
    <Carousel
      v-model:active="active"
      loop
      arrow="inside"
      pointer="inside"
      :view-size="3"
      :active-offset="1"
    >
      <CarouselItem v-for="n in 15" :key="n">
        <div class="demo-pane">
          内容{{ n }}
        </div>
      </CarouselItem>
    </Carousel>
  </div>
  <div style="height: 600px;">
    <Carousel loop vertical pointer="inside">
      <CarouselItem v-for="n in 10" :key="n">
        <div class="demo-pane--vertical">
          内容{{ n }}
        </div>
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Carousel from '../carousel.vue'
import CarouselItem from '../carousel-item.vue'

export default defineComponent({
  name: 'App',
  components: {
    Carousel,
    CarouselItem
  },
  data() {
    return {
      active: 9
    }
  }
})
</script>

<style lang="scss">
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

  &--vertical {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 100%;
    font-size: 30px;
    color: #fff;
    background-color: #4dabf7;
  }
}
</style>
