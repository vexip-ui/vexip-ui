<template>
  <Row style="max-width: 840px">
    <Column :span="20" style="padding-inline-end: 10px">
      <transition name="vxp-fade" mode="out-in">
        <img :key="active" style="width: 100%; height: 400px" :src="images[active]" />
      </transition>
    </Column>
    <Column :span="4">
      <Carousel
        v-model:active="active"
        loop
        vertical
        :view-size="4"
        :autoplay="5000"
        :height="400"
      >
        <CarouselItem v-for="(img, index) in images" :key="index">
          <img :src="img" style="max-width: 120px; height: 100%" />
        </CarouselItem>
      </Carousel>
    </Column>
  </Row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
const images = [
  'https://www.vexipui.com/picture-1.jpg',
  'https://www.vexipui.com/picture-2.jpg',
  'https://www.vexipui.com/picture-3.jpg',
  'https://www.vexipui.com/picture-4.jpg',
  'https://www.vexipui.com/picture-5.jpg'
]
</script>
