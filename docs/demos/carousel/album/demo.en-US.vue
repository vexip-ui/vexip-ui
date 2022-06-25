<template>
  <Row style="width: 840px;">
    <Column :span="20" style="padding-right: 10px;">
      <transition name="vxp-fade" mode="out-in">
        <img :key="active" style="width: 100%; height: 400px;" :src="images[active]" />
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
          <img :src="img" style="width: 120px; height: 100%;" />
        </CarouselItem>
      </Carousel>
    </Column>
  </Row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
const images = [
  '/picture-1.jpg',
  '/picture-2.jpg',
  '/picture-3.jpg',
  '/picture-4.jpg',
  '/picture-5.jpg'
]
</script>
